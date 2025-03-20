<script lang="ts" setup>
const { data: blogPosts } = await useAsyncData(() =>
  queryCollection("blog").order("date", "DESC").all(),
);
</script>

<template>
  <div>
    <OnyxHeadline is="h1">Blog posts</OnyxHeadline>

    <div class="posts">
      <BlogPostCard
        v-for="post in blogPosts"
        :key="post.id"
        :headline="post.title"
        :image="post.image"
        :description="post.description"
        :date="post.date"
        :href="post.path"
      />
    </div>
  </div>
</template>

<style lang="scss" scoped>
.posts {
  display: grid;
  gap: var(--onyx-grid-gutter);
  grid-template-columns: repeat(auto-fit, minmax(8rem, 20rem));
  margin-top: var(--onyx-density-xl);
}
</style>
