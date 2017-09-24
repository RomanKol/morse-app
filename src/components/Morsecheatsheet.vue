<template>
  <section id="cheatsheet">
    <header>
      <h3>Morse code cheatsheet</h3>
    </header>

    <label>
      Text input
      <input type="text" v-model="search">
    </label>

    <label>
      Filter by category
      <select v-model="category">
        <option value="">All</option>
        <option v-for="category in categories" v-bind:value='category'>{{ category }}</option>
      </select>
    </label>

    <table>
      <thead>
        <tr>
          <th>Category</th>
          <th>Character</th>
          <th>Morse Code</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in morseCode">
          <td>{{ item.category }}</td>
          <td>
            {{ item.character }}
            <small v-if="item.description"> {{ item.description }}</small>
          </td>
          <td>{{ item.code }}</td>
        </tr>
      </tbody>
    </table>

  </section>
</template>

<script>
import morse from './../scripts/morse.json';

function filterMorseItem(item, search, category) {
  const charCon = item.character.includes(search);
  const descrCon = item.description && item.description.includes(search);
  if (category === '') {
    return charCon || descrCon;
  }
  const catCon = item.category === category;
  return catCon && (charCon || descrCon);
}

export default {
  name: 'cheatsheet',
  data() {
    return {
      category: '',
      search: '',
    };
  },
  computed: {
    morseCode() {
      const search = this.search.toLowerCase();

      return morse.filter(item => filterMorseItem(item, search, this.category));
    },
    categories() {
      return Array.from(new Set(morse.map(item => item.category)));
    },
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
#cheatsheet {

  display: flex;
  flex-direction: column;

  label {
    flex: 1 1;
    align-self: flex-start;
    margin-bottom: 1em;
  }

  input,
  select {
    padding: 0.2em;
  }

  .wrapper {
    display: block;
    height: 300px;
    overflow-x: hidden;
    overflow-y: scroll;
  }
  table {
    list-style-type: none;
    width: 100%;
    border-collapse: collapse;
    th,
    td {
      padding: 0.25rem;
      text-align: left;
      border: 1px solid #ccc;
    }
    tbody {
      tr:nth-child(odd) {
        background: #eee;
      }
    }
  }
}
</style>
