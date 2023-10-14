<script lang="ts">
  import { onMount } from "svelte";

  let canvas;
  let ctx;

  onMount(() => {
    canvas = document.getElementById("canvas") as HTMLCanvasElement;
    ctx = canvas.getContext("2d");
    if (!ctx) throw new Error("Failed to get canvas context");

    // draw a square outline
    ctx.lineWidth = 1;

    for (let i = 0; i < 9; i++) {
      for (let j = 0; j < 9; j++) {
        ctx.beginPath();
        ctx.rect(0, 0, 61, 61);
        ctx.stroke();
        ctx.translate(61, 0);
      }
      ctx.translate(-61 * 9, 61)
    }
  });
</script>

<main>
  <h1>Sikaku</h1>

  <div class="container">
    <canvas id="canvas" width="550" height="550" />
  </div>
</main>

<style>
  .container {
    display: grid;
    place-items: center;
  }
  canvas {
    background-color: gainsboro;
    width: clamp(300px, 70vh, 550px);
    height: clamp(300px, 70vh, 550px);
  }
</style>
