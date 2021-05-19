
  //*************************+ cambio de tema  ***********************++ */

  if("tema" in localStorage){
    const data = localStorage.getItem('tema');
    document.documentElement.setAttribute('tema', data);
    if (data == "ligth"){
        document.querySelector('#switch input[type="checkbox"]').checked = true;
        document.documentElement.setAttribute('tema', 'light');
    }
    
  }
  const colorSwitch = document.querySelector('#switch input[type="checkbox"]');
            function cambiaTema(ev){
                if(ev.target.checked){
                    document.documentElement.setAttribute('tema', 'light');
                    localStorage.setItem('tema', 'ligth');

                } else {
                    document.documentElement.setAttribute('tema', 'dark');
                    localStorage.setItem('tema', 'dark');

                }
            }
            colorSwitch.addEventListener('change', cambiaTema);

