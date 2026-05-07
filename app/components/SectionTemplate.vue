<template>
  <section class="overflow-hidden">
    <UContainer>
      <div class="mb-16">
        <h2 class="text-4xl font-black tracking-tighter">
          <slot name="title" />
        </h2>
        <div class="h-1 w-20 bg-primary-500 mt-2" />
      </div>

      <slot />
    </UContainer>
  </section>
</template>
