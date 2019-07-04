const { remote } = window.require("electron");
const { webContents } = remote.getCurrentWindow();

export default (fn: Function) => {
  const div = createDiv();
  div.addEventListener("mousedown", () => {
    fn();
    removeDiv(div);
  });
  triggerMouseDown(div);
};

function createDiv(container = document.body): HTMLDivElement {
  const div = document.createElement("div");
  div.style.position = "fixed";
  div.style.top = "0";
  div.style.left = "0";
  div.style.width = "1px";
  div.style.height = "1px";
  container.appendChild(div);
  return div;
}

function removeDiv(div: HTMLDivElement, container = document.body): void {
  container.removeChild(div);
}

function triggerMouseDown(div: HTMLDivElement): void {
  const { left, top } = div.getBoundingClientRect();
  const event = { x: left, y: top, button: "left" };
  webContents.sendInputEvent(Object.assign({}, event, { type: "mouseDown" }));
  webContents.sendInputEvent(Object.assign({}, event, { type: "mouseUp" }));
}
