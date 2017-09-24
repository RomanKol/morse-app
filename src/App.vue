<template>
  <div id="app">
    <header>
      <h2>Morse-translator</h2>
      <p>App to translate text to morse code</p>
    </header>
    <main>
      <morsetranslator></morsetranslator>
      <morsecheatsheet></morsecheatsheet>
    </main>
  </div>
</template>

<script>
import Morsetranslator from './components/Morsetranslator';
import Morsecheatsheet from './components/Morsecheatsheet';

export default {
  name: 'app',
  components: {
    Morsetranslator,
    Morsecheatsheet,
  },
};
</script>

<style lang='scss'>
@import 'styles/index';

#app {
  background-color: #fff;
}
</style>
