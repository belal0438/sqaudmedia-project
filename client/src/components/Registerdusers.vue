<template>
  <Header />

  <table border="0.5" class="tableContainer">
    <tr class="trhead">
      <td>Name</td>
      <td>Phone</td>
      <td>Proffesion</td>
      <td>Actions</td>
    </tr>
    <tr>
      <td>Belal</td>
      <td>8678678678</td>
      <td>docter</td>
      <td class="btn">
        <button>Eddit</button> <button class="Delbtn">Delete</button>
      </td>
    </tr>
    <tr>
      <td>Ahmad</td>
      <td>878767567</td>
      <td>Engineering</td>
      <td class="btn">
        <button>Eddit</button> <button class="Delbtn">Delete</button>
      </td>
    </tr>
    <tr>
      <td>Sqaud</td>
      <td>877656767</td>
      <td>Coding</td>
      <td class="btn">
        <button>Eddit</button> <button class="Delbtn">Delete</button>
      </td>
    </tr>
  </table>
</template>

<script>
import Header from "./Header.vue";
export default {
  name: "Registerdusers",
  components: {
    Header,
  },
};
</script>

<style>
.tableContainer {
  margin-left: auto;
  margin-right: auto;
  margin-top: 40px;
  background-color: aliceblue;
  width: 60%;
}

.trhead td {
  font-weight: 600;
}

td {
  height: 3rem;
}
.btn {
  display: flex;
  align-items: center;
  justify-content: center;
}
.btn button {
  width: 50px;
  padding-left: 3px;
  height: 25px;
  margin-left: 10px;
}
.Delbtn {
  background-color: rgb(248, 150, 150);
}
</style>
