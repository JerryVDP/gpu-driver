<template>
    <div class="rounded-lg mx-auto my-4 w-11/12 p-3 bg-slate-100 dark:bg-slate-800">
        <slot></slot>
    </div>
</template>

<script>
export default {
  data() {
    return {
      count: 0
    }
  }
}
</script>