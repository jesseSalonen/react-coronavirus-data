import React, { Component } from 'react';
import './App.css';

class About extends Component {


    render () {
        return (
            <div>
              <h1>Tietoa sivuista</h1>
              <p>
                Tällä sivustolla voit selata kahta erilaista korona-aiheista kuvaajaa.
                Molemmat hakevat datansa suoraan THL:n avoimen datan API:sta, ja päivittyvät noin yhden päivän viiveellä,
                riippuen THL:n omista päivitysajankohdista.
              </p>
            </div>
          );
    }

}


export default About;