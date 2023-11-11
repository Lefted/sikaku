<script lang="ts">
  import { onMount } from "svelte";
  import { Selection } from "$lib/Selection";

  const GRID_SIZE = 9;
  const CANVAS_SIZE = 540;
  const TILE_SIZE = Math.ceil(CANVAS_SIZE / GRID_SIZE);

  let canvas: HTMLCanvasElement;
  let ctx: CanvasRenderingContext2D;

  const currentSelection = new Selection(0, 0, 0, 0, 5);

  const mousePos = { x: 0, y: 0 };
  const canvasPos = {
    x: 0,
    y: 0,
  };

  onMount(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
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
    updateMousePos(e);
    if (e.buttons === 1) {
      updateSelectionPos(e);
    }

    draw(e);
  }

  function updateMousePos(e: MouseEvent) {
    [mousePos.x, mousePos.y] = getMousePos(canvas, e);
  }

  function getMousePos(canvas: HTMLCanvasElement, evt: MouseEvent) {
    const rect = canvas.getBoundingClientRect(), // abs. size of element
      scaleX = canvas.width / rect.width, // relationship bitmap vs. element for X
      scaleY = canvas.height / rect.height; // relationship bitmap vs. element for Y

    return [
      (evt.clientX - rect.left) * scaleX,
      (evt.clientY - rect.top) * scaleY,
    ];
  }

  function updateSelectionPos(e: MouseEvent) {
    currentSelection.expand(mousePos.x, mousePos.y);
  }

  function onMouseDown(e: MouseEvent) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    updateCanvasPos();

    initSelectionPositions(e);

    draw(e);
  }

  function updateCanvasPos() {
    [canvasPos.x, canvasPos.y] = getCanvasPos(ctx, mousePos.x, mousePos.y);
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

  function initSelectionPositions(e: MouseEvent) {
    currentSelection.setStartPoint(mousePos.x, mousePos.y);
    currentSelection.setEndPoint(mousePos.x, mousePos.y);
  }

  function onMouseUp(e: MouseEvent) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    currentSelection.snapToGrid(CANVAS_SIZE, GRID_SIZE);

    draw(e);
  }

  // https://stackoverflow.com/questions/17130395/real-mouse-position-in-canvas
  // https://jsfiddle.net/mattdeeds/yqLvza57/37/
  function draw(e: MouseEvent) {
    ctx.resetTransform();

    drawGrid();
    if (e.buttons === 1) drawLine();
    else drawSelection();
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

  function drawSelection() {
    currentSelection.draw(ctx);
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
