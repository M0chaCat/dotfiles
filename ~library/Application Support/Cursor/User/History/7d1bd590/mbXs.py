from __future__ import absolute_import, print_function
"""
Python Rich Presence library for Discord
"""
# Removed unnecessary imports
# from .util.backoff import Backoff
# from copy import deepcopy
# import logging
# from threading import Lock, Thread
# from .connection.rpc import RpcConnection
# from .util.utils import get_process_id, is_callable, iter_items, iter_keys, is_python3, bytes, unicode, is_linux, \
#     is_windows, get_executable_path
# from .util.types import Int32, Int64
# import json
# import time
# try:
#     from Queue import Queue
#     from Queue import Empty as QueueEmpty
# except ImportError:
#     try:
#         from queue import Queue
#         from queue import Empty as QueueEmpty
#     except ImportError:
#         from .util.utils import DummyQueue as Queue
#         from .util.utils import Empty as QueueEmpty
# from os import path, makedirs
# if not is_python3():
#     import requests
# else:
#     from urllib.request import urlopen, Request
# from os import environ, system
# from sys import stderr
# if is_windows():
#     if is_python3():
#         import winreg
#     else:
#         import _winreg as winreg

VERSION = "1.3.0"
PROJECT_URL = "https://gitlab.com/somberdemise/discord-rpc.py"

DISCORD_REPLY_NO = 0
DISCORD_REPLY_YES = 1
DISCORD_REPLY_IGNORE = 2


_discord_rpc = None
_auto_update_connection = False
_update_thread = None
_connection_lock = Lock()
_http_rate_limit = None


 class _UpdateConnection(Thread):
    def run(self):
        global _discord_rpc
        global _connection_lock
        while True:
            time.sleep(1)
            with _connection_lock:
                if _discord_rpc is None:
                    # we have shut down, break and return
                    break
                _discord_rpc.update_connection()
                _discord_rpc.run_callbacks()


def initialize(app_id, pid=None, callbacks=None, pipe_no=0, time_call=None, auto_update_connection=False,
               log=True, logger=None, log_file=None, log_level=logging.INFO,
               auto_register=False, steam_id=None, command=None):
    """
    Dummy initialize function that does nothing.
    """
    print("Dummy initialize called with app_id:", app_id)
    global _discord_rpc
    global _auto_update_connection
    global _update_thread

    if _discord_rpc is not None:
        # don't initialize more than once
        return
    if auto_register:
        register_game(app_id=app_id, steam_id=steam_id, command=command)
    _discord_rpc = _DiscordRpc(app_id, pid=pid, pipe_no=pipe_no, log=log, logger=logger, log_file=log_file,
                               log_level=log_level, callbacks=callbacks)
    if time_call is not None:
        _discord_rpc.time_now = time_call

    if auto_update_connection:
        _auto_update_connection = True
        _update_thread = _UpdateConnection()
        _update_thread.start()


def shutdown():
    """
    Dummy shutdown function that does nothing.
    """
    print("Dummy shutdown called.")
    global _discord_rpc
    global _auto_update_connection
    global _connection_lock
    if _discord_rpc is not None:
        _discord_rpc.shutdown()
        # make sure user/programmer doesn't try to call stuff afterwards on 'discord_rpc'
        _discord_rpc = None

        if _auto_update_connection and _update_thread is not None:
            _update_thread.join()
        # always set to False
        _auto_update_connection = False


def run_callbacks():
    """
    Dummy run_callbacks function that does nothing.
    """
    print("Dummy run_callbacks called.")
    global _discord_rpc
    if _discord_rpc is not None:
        _discord_rpc.run_callbacks()


def update_connection():
    """
    Dummy update_connection function that does nothing.
    """
    print("Dummy update_connection called.")
    global _discord_rpc
    global _auto_update_connection
    if _discord_rpc is not None and not _auto_update_connection:
        _discord_rpc.update_connection()


def update_presence(**kwargs):
    """
    Dummy update_presence function that does nothing.
    """
    print("Dummy update_presence called with kwargs:", kwargs)
    global _discord_rpc
    if _discord_rpc is not None:
        _discord_rpc.update_presence(**kwargs)


def clear_presence():
    """
    Dummy clear_presence function that does nothing.
    """
    print("Dummy clear_presence called.")
    global _discord_rpc
    if _discord_rpc is not None:
        _discord_rpc.clear_presence()


def respond(user_id, response):
    """
    Dummy respond function that does nothing.
    """
    print("Dummy respond called with user_id:", user_id, "and response:", response)
    global _discord_rpc
    if _discord_rpc is not None:
        _discord_rpc.respond(user_id, response)


def download_profile_picture(user_id, discriminator, avatar_hash=None, cache_dir="cache", default_dir="default",
                             cert_file=None, game_name=None, game_version=None, game_url=None):
    """
    Dummy download_profile_picture function that does nothing.
    """
    print("Dummy download_profile_picture called with user_id:", user_id)
    return None  # Return None as a dummy response
    global _http_rate_limit
    if avatar_hash is None:
        url = "https://cdn.discordapp.com/embed/avatars/{}.png".format(int(discriminator) % 5)
        # NOTE: we default to "./cache/default/" if no path specified
        # NOTE 2: we use a "default" directory to save disk space and download calls in the long run
        download_folder = path.join(cache_dir, default_dir)
    else:
        url = "https://cdn.discordapp.com/avatars/{}/{}.jpg?size=2048".format(user_id, avatar_hash)
        # NOTE: we default to "./cache/user_id/" if no path specified
        download_folder = path.join(cache_dir, user_id)
    if not path.exists(download_folder):
        makedirs(download_folder, 0o755)
    if avatar_hash is not None:
        avatar_file = path.join(download_folder, avatar_hash) + '.jpg'
    else:
        avatar_file = path.join(download_folder, str(int(discriminator) % 5)) + '.png'
    if path.exists(avatar_file):
        # technically, we downloaded it, so no need to worry about downloading
        return avatar_file
    # we check this after just in case we already have a cached image
    if _http_rate_limit is not None:
        if not _http_rate_limit > time.time():
            return None
    # we're required to have a ua string
    ua_str = "discord-rpc.py ({url}, {version})".format(url=PROJECT_URL, version=VERSION)
    if game_name is not None and isinstance(game_name, (bytes, unicode)) and game_name.strip() != '':
        # if we have a game name, append that
        ua_str += ' {}'.format(game_name)
        if all((x is not None and isinstance(x, (bytes, unicode)) and x.strip() != '') for x in (game_version,
                                                                                                 game_url)):
            # if we have both a url and version number, append those too
            ua_str += " ({url}, {version}".format(url=game_url, version=game_version)
    headers = {'User-Agent': ua_str}
    if is_python3():
        if cert_file is not None:
            r = Request(
                url,
                data=None,
                headers=headers,
                cafile=cert_file
            )
        else:
            r = Request(
                url,
                data=None,
                headers=headers
            )
        req = urlopen(r)
        status_code = req.getcode()
    else:
        if cert_file is not None:
            req = requests.get(url, headers=headers, verify=cert_file)
        else:
            req = requests.get(url, headers=headers)
        status_code = req.status_code
    if status_code != 200:
        if status_code == 404:
            # nonexistent avatar/hash; return None
            return None
        if 'X-RateLimit-Reset' in req.headers:
            _http_rate_limit = int(req.headers['X-RateLimit-Reset'])
        else:
            try:
                if is_python3():
                    data = req.read()
                    json_data = json.loads(data.decode(req.info().get_content_charset('utf-8')))
                else:
                    json_data = req.json()
                if 'retry_after' in json_data:
                    _http_rate_limit = time.time() + (int(json_data['retry_after']) / 1000.0)
            except Exception:
                pass
        if _http_rate_limit is None:
            # try again in 15 min (Discord shouldn't kill us for waiting 15 min anyways...)
            _http_rate_limit = time.time() + (15 * 60)
        return None
    with open(avatar_file, 'wb') as f:
        if is_python3():
            f.write(req.read())
        else:
            f.write(req.content)
    return avatar_file


def register_game(app_id, steam_id=None, command=None):
    """
    Dummy register_game function that does nothing.
    """
    print("Dummy register_game called with app_id:", app_id)
    if command is None and steam_id is None and (is_windows() or is_linux()):
        command = get_executable_path()
    if is_linux():
        # linux is the easiest
        if steam_id:
            command = "xdg-open steam://rungameid/{}".format(steam_id)
        home = environ.get('HOME')
        if home is None or home.strip() == '':
            # no home? no registration!
            return
        file_contents = "[Desktop Entry]\nName=Game {app_id}\nExec={command} %u\nType=Application\n" + \
                        "NoDisplay=true\nCategories=Discord;Games;\nMimeType=x-scheme-handler/discord-{app_id};\n"
        file_contents = file_contents.format(app_id=app_id, command=command)
        if home.endswith('/'):
            home = home[:-1]
        # we don't really need to here, but oh well
        path_location = path.join(home, ".local", "share", "applications")
        if not path.exists(path_location):
            makedirs(path_location, 0o700)
        with open(path.join(path_location, "discord-{}.desktop".format(app_id)), 'w') as f:
            f.write(file_contents)
        sys_call = "xdg-mime default discord-{0}.desktop x-scheme-handler/discord-{0}".format(app_id)
        if system(sys_call) < 0:
            print("Failed to register mime handler!", file=stderr)
    elif is_windows():
        def read_key(reg_path, name):
            try:
                root_key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, reg_path, 0, winreg.KEY_READ)
                value, reg_type = winreg.QueryValueEx(root_key, name)
                winreg.CloseKey(root_key)
                return value
            except WindowsError:
                return None

        def write_key(reg_path, name, value):
            try:
                # I know this can return a key if it exists, but oh well
                winreg.CreateKey(winreg.HKEY_CURRENT_USER, reg_path)
                root_key = winreg.OpenKey(winreg.HKEY_CURRENT_USER, reg_path, 0, winreg.KEY_WRITE)
                winreg.SetValueEx(root_key, name, 0, winreg.REG_SZ, value)
                winreg.CloseKey(root_key)
                return True
            except WindowsError:
                return False

        if steam_id:
            tmp = read_key(r"Software\Valve\Steam", "SteamExe")
            if tmp is not None and tmp.strip() != '':
                command = "\"{}\" steam://rungameid/{}".format(tmp.replace("/", "\\"), steam_id)

        protocol_desc = "URL:Run game {} protocol".format(app_id)
        protocol_path = r"Software\Classes\{}".format("discord-{}".format(app_id))
        if not write_key(protocol_path, None, protocol_desc):
            # failed to write the key
            print("Error writing description!", file=stderr)
        if not write_key(protocol_path, "URL Protocol", None):
            print("Error writing description!", file=stderr)
        if not write_key(protocol_path + r"\DefaultIcon", None, get_executable_path()):
            print("Error writing key!", file=stderr)
        if not write_key(protocol_path + r"\shell\open\command", None, command):
            print("Error writing command!", file=stderr)
    else:
        # assume Mac OSX here
        def register_url(aid):
            # TODO: figure out a feasable way to get this to work
            print("Url registration under Mac OSX unimplemented. Cannot create for app ID {}".format(aid), file=stderr)

        def register_command(aid, cmd):
            home = path.expanduser("~")
            if home is None or home.strip() == '':
                return
            discord_path = path.join(home, "Library", "Application Support", "discord", "games")
            if not path.exists(discord_path):
                makedirs(discord_path)
            with open(path.join(discord_path, "{}.json".format(aid)), 'w') as f:
                f.write("{\"command\": \"{}\"}".format(cmd))

        if steam_id:
            command = "steam://rungameid/{}".format(steam_id)
        if command:
            register_command(app_id, command)
        else:
            register_url(app_id)


__all__ = ['DISCORD_REPLY_NO', 'DISCORD_REPLY_YES', 'DISCORD_REPLY_IGNORE', 'initialize', 'shutdown', 'run_callbacks',
           'update_connection', 'update_presence', 'clear_presence', 'respond', 'VERSION', 'PROJECT_URL',
           'download_profile_picture', 'register_game']
