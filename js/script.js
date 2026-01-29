// Minimal smooth-scroll for internal links
document.addEventListener('DOMContentLoaded', function(){
	// Menu toggle functionality
	var menuToggle = document.getElementById('menu-toggle');
	var navMenu = document.getElementById('nav-menu');
	
	if(menuToggle && navMenu){
		menuToggle.addEventListener('click', function(){
			navMenu.classList.toggle('active');
		});
		
		// Close menu when a link is clicked
		navMenu.querySelectorAll('a').forEach(function(link){
			link.addEventListener('click', function(){
				navMenu.classList.remove('active');
			});
		});
	}

	document.querySelectorAll('a[href^="#"]').forEach(function(a){
		a.addEventListener('click', function(e){
			var href = a.getAttribute('href');
			if(href && href !== '#'){
				var target = document.querySelector(href);
				if(target){
					e.preventDefault();
					target.scrollIntoView({behavior:'smooth', block:'start'});
				}
			}
		});
	});

	// Theme toggle (dark/light)
	var themeBtn = document.getElementById('theme-toggle');
	if(themeBtn){
		// apply saved theme
		if(localStorage.getItem('theme') === 'dark'){
			document.body.classList.add('dark');
			themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
		}

		themeBtn.addEventListener('click', function(){
			var isDark = document.body.classList.toggle('dark');
			if(isDark){
				localStorage.setItem('theme','dark');
				themeBtn.innerHTML = '<i class="fa-solid fa-sun"></i>';
			} else {
				localStorage.setItem('theme','light');
				themeBtn.innerHTML = '<i class="fa-solid fa-moon"></i>';
			}
		});
	}
});
