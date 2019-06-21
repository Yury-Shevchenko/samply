import axios from 'axios';
import { $ } from './bling';

//take submit event
function ajaxTest(e) {
  e.preventDefault();//stop submitting the form
  //console.log("Hearted");
  axios
    .post(this.action)
    .then(res => {
      //console.log(res);
      const isAdded = this.add.classList.toggle('heart__button--hearted');
      //console.log(isAdded);
      //$('.heart-count').textContent = res.data.tests.length;
      if(isAdded){
        this.add.classList.add('heart__button--float');
        this.add.classList.remove('heart__button--float');
        //setTimeout(() => this.add.classList.remove('heart__button--float'), 500);
      };
    })
    .then(out => {
      if(e.srcElement){
        window.location.href = e.srcElement.baseURI;
      } else {
        window.location.href =  e.target.baseURI;
      }
    })
    .catch(console.error);
};

export default ajaxTest;
