

$(document).ready(function(){
    let navItems = "";
    navItems = `<li class="nav-item "><a class="nav-link" href="index.html">Home</a></li>
                <li class="nav-item "><a class="nav-link" href="market.html">Marketplace</a></li>
                <li class="nav-item "><a class="nav-link" href="mydogos.html">My Dogos</a></li>
                <li class="nav-item "><a class="nav-link" href="breed.html">Breed Dogos</a></li>
                <li class="nav-item "><a class="nav-link" href="create-gen0.html">Create GEN-0</a></li>`

    $('#dogoNav').append(navItems);

})