<script lang="ts">
  import { MouseState } from "$lib/MouseState";
  import { SelectionState } from "$lib/SelectionState";
  import { onMount } from "svelte";

  const GRID_SIZE = 9;
  const CANVAS_SIZE = 540;
  const TILE_SIZE = Math.ceil(CANVAS_SIZE / GRID_SIZE);

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  let mouseState: MouseState;
  const selectionState = new SelectionState();

  const canvasPos = {
    x: 0,
    y: 0,
  };

  onMount(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    mouseState = new MouseState(canvas);
    ctx = getCanvasContext(canvas);

    drawGrid();
    document.addEventListener("mousemove", onMouseMove);
    document.addEventListener("mousedown", onMouseDown);
    document.addEventListener("mouseup", onMouseUp);
  });

  function getCanvasContext(canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");
    if (ctx == null) {
      throw new Error("Could not get canvas context");
    }
    return ctx;
  }

  function onMouseMove(e: MouseEvent) {
    mouseState.updateMouseState(e);

    if (mouseState.isLeftPressed()) {
      selectionState.updateSelectionPos(...mouseState.getMousePos());
    }

    draw();
  }

  function onMouseDown(_: MouseEvent) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateCanvasPos();

    selectionState.initCurrentSelection(...mouseState.getMousePos());

    draw();
  }

  function updateCanvasPos() {
    [canvasPos.x, canvasPos.y] = getCanvasPos(ctx, ...mouseState.getMousePos());
  }

  function getCanvasPos(
    ctx: CanvasRenderingContext2D,
    screenX: number,
    screenY: number
  ) {
    const matrix = ctx.getTransform();
    const imatrix = matrix.invertSelf();
    const x = screenX * imatrix.a + screenY * imatrix.c + imatrix.e;
    const y = screenX * imatrix.b + screenY * imatrix.d + imatrix.f;
    return [x, y];
  }

  function onMouseUp(e: MouseEvent) {
    mouseState.updateMouseState(e); // needed to update mouseState.isLeftPressed() in time

    selectionState.confirmSelection(CANVAS_SIZE, GRID_SIZE);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    draw();
  }

  // https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
  // https://jsfiddle.net/mattdeeds/yqLvza57/37/
  function draw() {
    ctx.resetTransform();

    drawGrid();
    drawSelections();
    if (mouseState.isLeftPressed()) drawLine();
  }

  function drawGrid() {
    ctx.lineWidth = 1;
    ctx.lineCap = "square";
    ctx.strokeStyle = "#000000";

    for (let i = 0; i < GRID_SIZE; i++) {
      for (let j = 0; j < GRID_SIZE; j++) {
        ctx.beginPath();
        ctx.rect(TILE_SIZE * j, TILE_SIZE * i, TILE_SIZE, TILE_SIZE);
        ctx.stroke();
      }
    }
  }

  function drawLine() {
    ctx.beginPath();

    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.strokeStyle = "#c0392b";

    ctx.moveTo(canvasPos.x, canvasPos.y);
    updateCanvasPos();
    ctx.lineTo(canvasPos.x, canvasPos.y);

    ctx.stroke();
  }

  function drawSelections() {
    selectionState.draw(ctx);
  }
</script>

<canvas id="canvas" width={CANVAS_SIZE} height={CANVAS_SIZE} />

<style>
  canvas {
    background-color: gainsboro;
    width: clamp(300px, 70vh, 550);
    height: clamp(300px, 70vh, 550);
  }
</style>
