
/**
 * Control for display "must save frame"
 */
var SaveFrameControl = L.Control.extend({  

  /*
   * Options of the painter
   */
  options: {
    position: 'bottomleft'
  },
 
  /*
   * Init the control
   */
  initialize: function (options) 
  {
    this.editMode = options.editMode;
  },
  
  /*
   * Add the UI an the map
   * @param {L.Map}               map                   The map
   */
  onAdd: function(map) 
  {
    let me = this;

    if(me.editMode) 
    {
      me._container = L.DomUtil.create('div', 'leaflet-bar leaflet-control must-sav-frame');
      me._container.innerHTML = Dictionary.get("MUST-SAVE");
      me._container.style['display'] = "none";

      me.initTimer();

      return me._container;
    }
    else 
    {
      return L.DomUtil.create('div', 'leaflet-bar leaflet-control');
    }
  },

  /*
   * Initialise the timer
   */
  initTimer: function()
  {
    let me = this;
    if(me.timer)
    {
      clearInterval(me.timer);
    }
    let duration = 1 * 60 * 1000;
    me.timer = setTimeout(() => { me.show() }, duration);
  },

  /*
   * Redraw the text with Dictionnary
   */
  redraw: function(map) 
  {
    if(this.editMode) 
    {
      this._container.innerHTML = Dictionary.get("MUST-SAVE");
    }
  },

  /*
   * Show the UI
   */
  show : function()
  {
    this._container.style['display'] = "inline-block";
  },

  /*
   * Hide the UI
   */
  hide : function()
  {
    this._container.style['display'] = "none";
  }
});