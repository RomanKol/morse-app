<template>
  <div id="app">
    <header>
      <h2>Morse-translator</h2>
      <p>App to translate text to morse code</p>
    </header>
    <main>
      <morsetranslator></morsetranslator>
    </main>
  </div>
</template>

<script>
import Morsetranslator from './components/Morsetranslator';

export default {
  name: 'app',
  components: {
    Morsetranslator,
  },
};
</script>

<style lang='scss'>
@import 'styles/index';

#app {
  background-color: #fff;
}
</style>
