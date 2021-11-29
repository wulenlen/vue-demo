<template>
    <div class="container">
        <div id="anchor1">1</div>
        <div id="anchor2">2</div>
        <div id="anchor3">3</div>
        <div id="anchor4">4</div>
        <div id="anchor5">5</div>

        <div class="sidebar">
            <a class=scroll href=#anchor1>Intro</a>
            <a class=scroll href=#anchor2>About</a>
        </div>
    </div>
</template>

<style scoped>
.sidebar {
    position: fixed;
    top: 20px;
    right: 0;
}

.container div:not(.sidebar) {
    height: 200px;
    width: 200px;
    background: red;
    border: 1px solid #ccc;
}
</style>