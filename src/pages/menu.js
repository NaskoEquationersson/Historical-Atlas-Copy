/**
 * Class for display menu of choise language
 */
class Menu 
{
  /**
   * Init the menu, with choise of the langue
   * @property {String}                  lang                  The lang
   */
  static init(lang)
  {
    let content = `
    <label for="langue-select">${Dictionary.get("MENU_CHOISE_LANGUE_LABEL")}</label>
    <select name="langue-select" id="langue-select">
        <option value="fr">Francais</option>
        <option value="en">English</option>
    </select>`;
    $("#menu-change-lang").html(content);

    if($(".back-menu-link").length > 0) {
      let contentBackLink = `<div class="back-menu-div">
            <i class="fa-solid fa-arrow-left back-menu-icon"></i>
            <span class="back-menu-text">Retour au menu</span>
          </div>`
      $(".back-menu-link").html(contentBackLink);
      $(".back-menu-text").html(Dictionary.get('BACK_MENU'));
    }

    $("#langue-select").val(lang);

    $("#langue-select").on('change', function() 
    {
      let lang = this.value;

      Config.setCookie("lang", lang, 30);

      var url = window.location.href;    
      if (url.indexOf('lang=') > -1)
      {
        // If is in URL -> delete lang param et remplace this
        let urlSplit = url.split('lang=');
        let params = urlSplit[1].split('&');

        url = urlSplit[0];
        url += "lang="+lang;
        for(let i = 1; i < params.length; i++)
        {
          url += "&"+params[i];
        }
      }
      else
      {
        if (url.indexOf('?') > -1)
        {
          url += '&lang='+lang;
        }
        else 
        {
          url += '?lang='+lang;
        }
      }
      window.location.href = url;
    });
  }

  /* 
   * Load the dictionnary for get the lang
   */
  static loadDictionnary()
  {
    let lang = "en";
    if(Config.getCookie("lang"))
      lang = Config.getCookie("lang");

    let params = Config.getUrlParams();
    if(params["lang"])
      lang = params["lang"];

    return new Promise((resolve, reject) => {
      Config.load(true).then((config) =>
        {
          Dictionary.load(lang, "../", function()
          {
            Menu.init(lang);

            resolve(config);
        });
      });
    });
  }
}

