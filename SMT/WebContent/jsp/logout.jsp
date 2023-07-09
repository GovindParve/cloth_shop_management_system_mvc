<script src="/SMT/staticContent/js/jquery-1.12.3.min.js"></script>
<script src="/SMT/staticContent/js/logout.js"></script>
<link rel="stylesheet" type="text/css" href="/SMT/staticContent/css/loader.css">
<form action="Logout" method="post">
	<input type="button" value="Logout" onclick="Logout();loader()">
</form>
<div id="loading" style="visibility:hidden;"></div>
	<script>
var preloader=document.getElementById("loading");
function loader(){
	preloader.style.visibility = "visible";
}
</script>