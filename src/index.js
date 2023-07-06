// write your code here
document.addEventListener('DOMContentLoaded', () => {
    const ramenMenu = document.querySelector('#ramen-menu');
    const ramenDetail = document.querySelector('#ramen-detail');
    const newRamenForm = document.querySelector('#new-ramen');
  
    fetch('http://localhost:3000/ramens')
      .then(response => response.json())
      .then(data => {
        const ramens = data.ramens;
        
        ramens.forEach(ramen => {
          const ramenImg = document.createElement('img');
          ramenImg.src = ramen.image;
          ramenImg.alt = ramen.name;
          ramenImg.dataset.id = ramen.id;
          ramenMenu.appendChild(ramenImg);
        });
  
     
        renderRamenDetails(ramens[0]);
      });
  
  
    ramenMenu.addEventListener('click', event => {
      if (event.target.tagName === 'IMG') {
        const ramenId = event.target.dataset.id;
  
        
        fetch(`http://localhost:3000/ramens/${ramenId}`)
          .then(response => response.json())
          .then(ramen => {
            renderRamenDetails(ramen);
          });
      }
    });
  
    
    newRamenForm.addEventListener('submit', event => {
      event.preventDefault();
  
      const name = document.querySelector('#new-name').value;
      const restaurant = document.querySelector('#new-restaurant').value;
      const image = document.querySelector('#new-image').value;
      const rating = document.querySelector('#new-rating').value;
      const comment = document.querySelector('#new-comment').value;
  
      const newRamen = {
        name,
        restaurant,
        image,
        rating,
        comment
      };
  
     
      const newRamenImg = document.createElement('img');
      newRamenImg.src = newRamen.image;
      newRamenImg.alt = newRamen.name;
      newRamenImg.dataset.id = newRamen.id; // Assuming the API assigns an ID
      ramenMenu.appendChild(newRamenImg);
  
      
      newRamenForm.reset();
    });
  
    
    function renderRamenDetails(ramen) {
      const detailImg = document.querySelector('.detail-image');
      const detailName = document.querySelector('.name');
      const detailRestaurant = document.querySelector('.restaurant');
      const ratingDisplay = document.querySelector('#rating-display');
      const commentDisplay = document.querySelector('#comment-display');
  
      detailImg.src = ramen.image;
      detailImg.alt = ramen.name;
      detailName.textContent = ramen.name;
      detailRestaurant.textContent = ramen.restaurant;
      ratingDisplay.textContent = ramen.rating;
      commentDisplay.textContent = ramen.comment;
    }
  });
  
