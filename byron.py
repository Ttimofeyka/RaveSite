import os
import sys
import shutil
import re
import time


VERSION = (3, 0, 0, 1)
VERSIONSTR = ".".join(map(str, VERSION))

def process_css(text):
    return text
def process_html(text, rendervars=None):
    def matcher(match: re.Match):
        cmd = match.group()[4:-4].strip()
        if cmd.startswith("byronread"):
            return f"/* File: {cmd} */\n" + process_css(open(cmd[len("byronread "):]).read())
        elif cmd.startswith("byronexec"):
            fdata = ""
            def append_html(*h):
                nonlocal fdata
                fdata += "".join(h)
            exec(cmd[len("byronexec"):].strip(),{"append_css": append_html, "byron_render_vars": rendervars if rendervars is not None else {}, **globals()})
            return f"/* Generated with `byronexec` */\n" + fdata
        elif cmd.startswith("byroneval"):
            return eval(cmd[len("byroneval"):].strip(),{"byron_render_vars": rendervars if rendervars is not None else {}, **globals()})
        print(f"[!!!] Unknown ByronPack CSS command: {cmd}")
        return f"/* Unknown ByronPack command: {cmd} */"
    def matcher_html(match: re.Match):
        cmd = match.group()[6:-5].strip()
        if cmd.startswith("byronread"):
            return f"<!-- File: {cmd} -->\n" + process_html(open(cmd[len("byronread "):]).read())
        elif cmd.startswith("byronexec"):
            fdata = ""
            def append_html(*h):
                nonlocal fdata
                fdata += "".join(map(str, h))
            exec(cmd[len("byronexec"):].strip(),{"append_html": append_html, "byron_render_vars": rendervars if rendervars is not None else {}, **globals()})
            return f"<!-- Generated with `byronexec` -->\n" + fdata
        elif cmd.startswith("byroneval"):
            return eval(cmd[len("byroneval"):].strip(),{"byron_render_vars": rendervars if rendervars is not None else {}, **globals()})
        print(f"[!!!] Unknown ByronPack HTML command: {cmd}")
        return f"<!-- Unknown ByronPack command: {cmd} -->"
    return re.sub("\\/\\*\\*\\[(.|\\s)*?\\]\\*\\*\\/", matcher, re.sub("<!---\\[(.|\\s)*?\\]--->", matcher_html, text))

def on_change():
    print(f"Repacking!")
    if os.path.isdir("build"):
        shutil.rmtree("./build/")
        os.mkdir("./build/")

    if not os.path.isdir("./src"):
        os.mkdir("./src/")

    for dir, folders, files in os.walk("src"):
        if dir.endswith(".byronignore"):
            continue
        
        if dir.startswith("src/"):
            dir = dir.removeprefix("src/") + "/"
        elif dir.startswith("src"):
            dir = dir.removeprefix("src") + "/"
        else:
            assert False, dir
        if dir.strip() != "/":
            os.mkdir(f"./build/{dir}")
            
        for file in files:
            if file.endswith(".byronpack.html"):
                fdata = open(f"./src/{dir}{file}").read()
                open(f"./build/{dir}{file.removesuffix(".byronpack.html")}.html", "w").write(f"<!-- Byronpack v{VERSIONSTR} -- bundle from ./src/{dir}{file} -->\n"+process_html(fdata))
            elif file.endswith(".byronpack.cssbundle"):
                fl = (x.strip() for x in open(f"./src/{dir}{file}").read().split("\n") if x.strip() != "" and "//" not in x)
                fdata = f"/* Byronpack v{VERSIONSTR} CSS Bundle*/\n"
                for file2x in fl:
                    fdata += f"/* File: {file2x} */\n"
                    fdata += process_css(open(file2x).read()) + "\n"
                open(f"./build/{dir}{file.removesuffix(".byronpack.cssbundle")}.css", "w").write(fdata)
            elif ".byronignore." in file:
                continue
            else:
                shutil.copy(f"./src/{dir}{file}", f"./build/{dir}")

if "--watchdog" in sys.argv[1:]:
    try:
        import watchdog
        import watchdog.events
        import watchdog.observers
    except ImportError:
        print("ERROR: no `watchdog` module installed. To run ByronPack in watchdog mode, run `pip install watchdog`.")
        exit(1)
    print(f"!ByronPack v{VERSIONSTR} Watchdog")
    print(f"Watching for any file changes")
    class MyEventHandler(watchdog.events.FileSystemEventHandler):
        def on_modified(self, event: watchdog.events.FileSystemEvent) -> None:
            on_change()
        def on_created(self, event: watchdog.events.FileSystemEvent) -> None:
            on_change()
        def on_deleted(self, event: watchdog.events.FileSystemEvent) -> None:
            on_change()
        def on_moved(self, event: watchdog.events.FileSystemEvent) -> None:
            on_change()

    eh = MyEventHandler()
    observer = watchdog.observers.Observer()
    observer.schedule(eh, "src/", True)
    observer.start()

    try:
        while True:
            time.sleep(1)
    except KeyboardInterrupt:
        observer.stop()
        observer.join()
else:
    print(f"!ByronPack v{VERSIONSTR}")
    on_change()