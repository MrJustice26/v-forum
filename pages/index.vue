<template>
    <section class="intro py-10 text-center bg-emerald-600/50">
        <div class="intro-wrapper">
            <div class="container mx-auto max-w-[1200px]">
                <h1 class="text-3xl mb-3 font-medium">V-Forum</h1>
                <p>The most progressive forum for your needs.</p>
            </div>
        </div>
    </section>

    <main>
        <BaseContainer>
            <header class="post-header">
                <BaseButton> Add post </BaseButton>
            </header>
        </BaseContainer>
    </main>
</template>

<style lang="scss" scoped>
.post {
    &-header {
        padding-top: 1rem;
        text-align: center;
    }
    &-list {
        list-style: none;
        padding: 0;
        margin: 0;
    }
}
</style>
