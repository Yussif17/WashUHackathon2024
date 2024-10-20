export function submitButton() {
  let array = ['js-submit','js-switch-img','lowerhalf','toplowerhalf','js-image'];
  array.forEach((item) => {
    document.querySelector(`.${item}`).classList.add('invisible');
  });
   // ...
  // ^ show map with line between input marker and actual marker
  //remove input 
  document.getElementById('map-container').classList.remove('map-container');
  document.getElementById('map-container').classList.add('js-map-container');
};