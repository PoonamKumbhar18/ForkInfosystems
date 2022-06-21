let slideIndex = 0;
showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";  
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}    
  for (i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  slides[slideIndex-1].style.display = "block";  
  dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 2000); // Change image every 2 seconds
}

const navSlide = ()=> 
{
    const burger = document.querySelector('.burger');
    const nav = document.querySelector('.nav-links');
    const navLinks = document.querySelectorAll('.nav-links li');

    //Toggle nav
    burger.addEventListener('click',()=>
    {
      nav.classList.toggle('nav-active');   

      //Animate links

      navLinks.forEach((link,index) => {
          if(link.style.animation)
          {
              link.style.animation = ''
          }
          else
          {
              link.style.animation = `navLinkFade 0.5s ease forwards ${index / 7 + 0.3}s`;

          }

      });
      //Burger animation
      
      burger.classList.toggle('toggle');
    });

}

navSlide();



// view gallary


/*
	We start our code with an ajax request to fetch the data
	from the json file.
*/
// First i create a new xmlhttp-request object.
let http = new XMLHttpRequest();
// the variable http holds now all methods and properties of the objct.

//  next i prepare the request with the open() method.
http.open('get', '../json/gallary.json', true);
// the first argument sets the http method.
// in the second argument we pass the file where our data lives.
// and last the keyword true, sets the request to be async.

// next i will send the request.
http.send();

// Now i have to catch the response.
// i will check the onload eventlistener.
http.onload = function(){
	// Inside the function i need to check the readystate and status properties.
	if(this.readyState == 4 && this.status == 200){
		// if we have a successful response, i have to parse the json data
		// and convert them to a javascript array.
		let gallarys = JSON.parse(this.responseText);

		// next i need an empty variable to add the incoming data.
		let output = "";

		// now i have to loop trough the products, and in every iteration
		// i add an html template to the output variable.
		for(let item of gallarys){
			output += `
				<div class="product">
					<img src="${item.image}" alt="${item.description}">
					
					 <p class="description">${item.description}</p>
					
					
				</div>
			`;
		}
		/* and last i target the products container and add the data that the
		output variable holds. */
		document.querySelector(".gallarys").innerHTML = output;
	}
	
}


// async function getPictures(){
//   const result = await fetch("../json/gallary.json");
//             const data = await result.json();
//             const pics = data.pictures;
            
//             for(let item of pics){
//               console.log("byy");
//               var product = document.createElement("div");
//               var img = document.createElement("img");
//               img.src = item.image;
//               product.appendChild(img);
//               document.querySelector(".gallarys").appendChild(product);
//             }
// }

 

			

/*fetch file from Placement.json*/
fetch("../json/placements.json")
.then(function(response){
    return response.json();
})

.then(function(placements){
    let placeholder = document.querySelector("#data-output");
    let out = "";
    for(let placement of placements){
        out+=`
        <tr>
            <td>${placement.name}</td>
            <td>${placement.company}</td>
            <td>${placement.technology}</td>
            <td>${placement.year}</td>
        </tr>
        `;
    }

    placeholder.innerHTML = out;
});