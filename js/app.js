/**
 * 
 * Manipulating the DOM exercise.
 * Exercise programmatically builds navigation,
 * scrolls to anchors from navigation,
 * and highlights section in viewport upon scrolling.
 * 
 * Dependencies: None
 * 
 * JS Version: ES2015/ES6
 * 
 * JS Standard: ESlint
 * 
*/

/**
 * Define Global Variables
 * 
*/
	const navList = document.querySelector('#menu__link');
	const dynamicContent = Array.from(document.querySelectorAll('section'));
	let dataNavArray = [];
	const topBtn = document.getElementById("topBtn");
	

/**
 * End Global Variables
 * Start Helper Functions
 * 
*/
handleLinkClick = (e) => {
    e.preventDefault();
    scrollToFunction(e.target.name);
}

/**
 * End Helper Functions
 * Begin Main Functions
 * 
*/

// build the nav
	navBuild = () => {
		dynamicContent.forEach((section) => {
			let dataNav = section.firstElementChild.firstElementChild.innerText;
				dataNavArray.push(dataNav);
		})

		// loop for each section and add an list item for it
		dataNavArray.forEach((navItemName, index) => {
			// create an anchor element
			const menuLink = document.createElement('a');

			// add section name to the anchor
			menuLink.textContent = `${navItemName}`;

			// add class .menu__link to the anchor
			menuLink.className = 'menu__link';

			// add attribute href pointing to section id
			menuLink.setAttribute('id', `buttonsection${index + 1}`);
			
			menuLink.setAttribute('href', `#section${index + 1}`);

			// add attribute name to each link
			menuLink.setAttribute('name', `section${index + 1}`);

			// add event listener to each link 
			menuLink.addEventListener('click', function(e){
				e.preventDefault();
				scrollToFunction(e.target.name,e.target);
			});

			// add class .active to first link only
			if (index === 0) {
				menuLink.classList.add('currentActiveTab');
			}

			// create list item element
			const listItem = document.createElement('li');

			// append menu link to li
			listItem.appendChild(menuLink);

			// append list items to the nav bar unorderd list
			navList.appendChild(listItem);
		})
	}
	

// Scroll to section on link click
scrollToFunction = (sectionName,buttonc) => {

    const targetSection = dynamicContent.find(section => {
        return (section.id.localeCompare(sectionName) === 0)
    })

    //scroll to this
    let scrollOptions = {
        left: 0,
        top: targetSection.offsetTop - 100,
        behavior: 'smooth'
    }
    window.scrollTo(scrollOptions);
	
	

	
}

// Add class 'active' to section when near top of viewport
window.addEventListener('scroll', () => {
	scrollFunction()
	dynamicContent.forEach((section) => {
		let sectop = Number(section.offsetTop - 100); // subtract 200 for the size of nav bar	
		let secbottom = Number(section.offsetTop + section.offsetHeight - 100); // subtract 200 for the size of nav bar
		let currentoffeset = Number(window.pageYOffset);
			
		if (secbottom > currentoffeset)
		{
			if (currentoffeset > sectop)
			{
				const newLink = document.getElementsByName(`${section.id}`);
				const oldLink = document.getElementsByClassName('currentActiveTab');
				oldLink[0].classList.remove('currentActiveTab');
				newLink[0].classList.add('currentActiveTab');
				const oldsec = document.getElementsByClassName('your-active-class');
				oldsec[0].classList.remove('your-active-class')
				section.classList.add('your-active-class')
			}
		}
			
	})



});

/**
 * End Main Functions
 * Begin Events
 * 
*/

// Build menu 
navBuild();



// When the user clicks on the button, scroll to the top of the document
topFunction = () => {
  let scrollOptions = {
        left: 0,
        top: 0,
        behavior: 'smooth'
    }
    window.scrollTo(scrollOptions);
}

scrollFunction = () => {
  if (document.body.scrollTop > 20 || document.documentElement.scrollTop > 20) {
    topBtn.style.display = "block";
  } else {
    topBtn.style.display = "none";
  }
}


