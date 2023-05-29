<template>
  <footer class="footer px-4">
    <b-row align-v="center" class="justify-content-lg-between">
      <b-col lg="6">
        <div class="copyright text-center text-lg-left text-muted">
          © Copyright  {{year}} por
          <a href="https://hully.com" class="font-weight-bold ml-1" target="_blank">Jonathan Zubieta</a> y
          <a href="https://hully.com" class="font-weight-bold ml-1" target="_blank">Junior Pezantes.</a> Todos los derechos reservados.
        </div>
      </b-col>
      <b-col lg="6">
        <b-nav align="center" class="nav-footer justify-content-lg-end">
          <b-nav-item href="https://hully.com"  target="_blank">
            Servicios
          </b-nav-item>
          <b-nav-item href="https://hully.com" target="_blank">
            Nosotros
          </b-nav-item>
          <b-nav-item href="http://blog.hully.com" target="_blank">
            Blog
          </b-nav-item>
          <b-nav-item href="https://hully.com" target="_blank">
            Licencia
          </b-nav-item>
        </b-nav>
      </b-col>
    </b-row>
  </footer>
</template>
<script>
export default {
  data() {
    return {
      year: new Date().getFullYear()
    };
  }
};
</script>
<style>
a {
color:#1D7F31
}
a:hover {
  color: #00a65a;
}
.footer {
    background: #ecf0f5;
    padding: 2.5rem 0;
}
</style>
