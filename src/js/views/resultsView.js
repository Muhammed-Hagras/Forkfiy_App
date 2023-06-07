import View from './view.js';
import icons from 'url:../../img/icons.svg'; // Parcel 2
import previewView from './previewView';

class ResultsView extends View {
  _parentElement = document.querySelector('.results');
  _errorMessage = 'Could not find that recipe. Please try another one!';
  _message = '';

  _generateMarkup() {
    return this._data.map(result => previewView.render(result, false)).join('');
  }
}

export default new ResultsView();
