from nicegui import ui

editor = ui.editor(placeholder="Type something here...").classes("w-full h-80")
ui.markdown().bind_content_from(editor, "value")

ui.run(title="Text Editor", favicon="⌨")
