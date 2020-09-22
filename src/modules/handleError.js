export const handleError = (error, cards) => {
  cards.innerHTML = `
      <div class="message">    
        <p>We are very sorry, but somethings went wrong.</p>   
        <p>Please refresh a page or try again few later.</p>
      </div>
    `
  console.error(error);
}