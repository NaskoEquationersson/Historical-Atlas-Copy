/**
 * Class for map frame
 */
class MenuMapFrame
{
  /**
   * Init the map frame
   * @param {Object}           map                    Map data
   * @param {String}           idHtmlParent           The html id of the element
   * @param {Number}           number                 The number of the element
   * @param {Boolean}          isUserMap              True if is user map
   */
    constructor(map, idHtmlParent, number, isUserMap) 
    {
        if(isUserMap) {
            this.displayUserMap(map, idHtmlParent, number, false);
        }
        else {
            this.displayMap(map, idHtmlParent);
        }
    }

    /**
     * Display maps (public or feactured)
     * @param {Object}           map                    Map data
     * @param {String}           idHtmlParent           The html id of the element
     */
    displayMap(map, idHtmlParent) 
    {
        let me = this;

        let categoryText = Dictionary.get('MAP_TYPE_' + map.category.toUpperCase());

        let content = `<tr>`;
        content += `<td>${map.lang.toUpperCase()}</td>`;

        if(categoryText != undefined) {
            content += `<td>${categoryText}</td>`;
        }
        else {
            content += `<td></td>`;
        }

        content += `<td class="title-map"><b>${map.name}</b></td>`;
        content += `<td class="user-map"><b>${map.userName}</b></td>`;
        content += `<td class="date-map creation-date-col">${map.creationDate ? map.creationDate.toISOString().split("T")[0] : ""}</td>`;
        content += `<td class="date-map edition-date-col">${map.updateDate ? map.updateDate.toISOString().split("T")[0] : ""}</td>`;
        content += `<td class="icon-action-td"><a href="histoAtlas.html?mapId=${map.id}&edit=false"><img class="icon-action" src="img/menu/eye-solid.svg" title="${Dictionary.get('INDEX_MAP_VIEW')}" /></a></td>`;
        content += `<td class="icon-action-td"><a style="width:100%" href="histoAtlasMapbox.html?mapId=${map.id}"><img class="icon-action" src="img/menu/earth-africa-europe.svg" title="${Dictionary.get('INDEX_MAP_VIEW_3D')}" /></a></td>`;
        if(map.publicEditable)
        {
            content += `<td class="icon-action-td edition-col"><a href="histoAtlas.html?mapId=${map.id}"><img class="icon-action" src="img/menu/edit-solid.svg" title="${Dictionary.get('INDEX_MAP_EDIT_COPY')}" /></a></td>`;
        }
        else {
            content += `<td class="edition-col"></td>`;
        }
        content += `<td class="icon-action-td iframe-col"><a><img class="iframe-publicmap" id="iframe-publicmap_${map.id}" src="img/menu/iframe.png" title="${Dictionary.get('INDEX_MAP_EXPORT_MAP')}" /></a></td>`;
        content += `</tr>`;
        $("#" + idHtmlParent).append(content);

        // Manage iframe
        $(`#iframe-publicmap_${map.id}`).on("click",function() 
        {
            me.copyIFrame(map.id);
        });
    }

    /**
     * Display user maps
     * @param {Object}           map                    Map data
     * @param {String}           idHtmlParent           The html id of the element
     * @param {Number}           number                 The number of the element
     * @param {Boolean}          update                 True if update (is false for creation)
     */
    displayUserMap(map, idHtmlParent, number, update) 
    {
        let me = this;
        if(!update) {
            let content = `<tr id='map-frame-user_${number}'></tr>`;
            $("#" + idHtmlParent).append(content);
        }

        // Manage visible color
        if(map.public) {
          $(`#map-frame-user_${number}`).addClass("line-map-visible");
        }
        else {
          $(`#map-frame-user_${number}`).removeClass("line-map-visible");
        }
        
        // Display line content
        let categoryText = Dictionary.get('MAP_TYPE_' + map.category.toUpperCase());

        let content = ``;
        content += `<td>${map.lang.toUpperCase()}</td>`;

        if(categoryText != undefined) {
            content += `<td id="map-frame-category_${number}">${categoryText}</td>`;
        }
        else {
            content += `<td id="map-frame-category_${number}"></td>`;
        }

        // Button for view and change visibility of maps
        let editVisibilityImgs = ``;
        if(map.public) {
          editVisibilityImgs += `<img class="icon-action-public" id="change-public-state_${number}" src="img/menu/eye-solid-green.svg" title="${Dictionary.get('INDEX_MAP_VIEW_AVAILABLE')}" />`;

          if(map.publicEditable) {
            editVisibilityImgs += `<img class="icon-action-editable" id="change-editable-state_${number}" src="img/menu/edit-solid-green.svg" title="${Dictionary.get('INDEX_MAP_EDIT_AVAILABLE')}" />`;
          }
          else {
            editVisibilityImgs += `<img class="icon-action-editable" id="change-editable-state_${number}" src="img/menu/edit-solid-red.svg" title="${Dictionary.get('INDEX_MAP_EDIT_UNAVAILABLE')}" />`;
          }
        }
        else {
          editVisibilityImgs += `<img class="icon-action-public" id="change-public-state_${number}" src="img/menu/eye-solid-red.svg" title="${Dictionary.get('INDEX_MAP_VIEW_UNAVAILABLE')}" />`;
        }

        content += `<td id="map-frame-name_${number}" class="title-map"><b>${map.name}</b><img style="cursor:pointer" class="icon-action" id="rename_${number}" src="img/menu/rename.png" title="${Dictionary.get('INDEX_MAP_RENAME')}" /></td>`;

        content += `<td class="user-map">${editVisibilityImgs}</td>`;

        content += `<td class="date-map">${map.creationDate ? map.creationDate.toISOString().split("T")[0] : ""}</td>`;
        content += `<td class="date-map">${map.updateDate ? map.updateDate.toISOString().split("T")[0] : ""}</td>`;
        content += `<td class="icon-action-td"><a href="histoAtlas.html?mapId=${map.id}&edit=false"><img class="icon-action" src="img/menu/eye-solid.svg" title="${Dictionary.get('INDEX_MAP_VIEW')}" /></a></td>`;
        content += `<td class="icon-action-td"><a style="width:100%" href="histoAtlasMapbox.html?mapId=${map.id}"><img class="icon-action" src="img/menu/earth-africa-europe.svg" title="${Dictionary.get('INDEX_MAP_VIEW')}" /></a></td>`;
        content += `<td class="icon-action-td"><a href="histoAtlas.html?mapId=${map.id}"><img class="icon-action" src="img/menu/edit-solid.svg" title="${Dictionary.get('INDEX_MAP_EDIT')}" /></a></td>`;

        content += `<td class="icon-action-td"><img style="cursor:pointer" class="icon-action" id="delete_${number}" src="img/menu/trash-solid.svg" title="${Dictionary.get('INDEX_MAP_DELETE')}" /></td>`;
        
        if(map.public) {
          content += `<td class="icon-action-td"><a><img class="iframe-publicmap" id="iframe-publicmap_${map.id}" src="img/menu/iframe.png" title="${Dictionary.get('INDEX_MAP_EXPORT_MAP')}" /></a></td>`;
        }
        else {
          content += `<td></td>`;
        }
        
        $(`#map-frame-user_${number}`).html(content);

        // Manage rename action
        $(`#rename_${number}`).click(function() 
        {
            let content = `<input id="map-rename-input_${map.id}" style="width:200px; margin-left: 5px" value="${map.name}"></input>
                           <button id="map-rename-save_${map.id}">${Dictionary.get("INDEX_MAP_RENAME_SAVE")}</button>
                           <button id="map-rename-cancel_${map.id}">${Dictionary.get("INDEX_MAP_RENAME_CANCEL")}</button>`;

            // title-map
            $(`#map-frame-name_${number}`).html(content);

            // Cancel rename
            $(`#map-rename-cancel_${map.id}`).click(function()
            {
              //$(`#map-div_${number}`).html(initMapDivContent(map, number));
              me.displayUserMap(map, idHtmlParent, number, true);
            });

            // Save new name ofr the file
            $(`#map-rename-save_${map.id}`).click(function()
            {
              let mapNewName = $(`#map-rename-input_${map.id}`).val();

              var nameRegex = /^[a-zA-Z0-9\s]+$/;
              if(!nameRegex.test(mapNewName))
              {
                toastr.error(Dictionary.get("MAP_SAVEANDLOAD_SAVE_FILENAME_INVALID"), '');
                return;
              }
              let fileName = mapNewName.replaceAll(" ", "_");

              Utils.callServer("map/rename", "POST", {user : localStorage.getItem('session-id-histoatlas'), id : map.id, newName : mapNewName, fileName : fileName}).then((result) => 
              {
                //document.location.href="index.html";
                map.name = mapNewName;
                me.displayUserMap(map, idHtmlParent, number, true);
              }).catch((err) => { 
                if(err.responseJSON) {
                    toastr.error(Dictionary.get(err.responseJSON.error), Dictionary.get('INDEX_RENAME_UNABLE'));
                }
                else {
                    toastr.error("", Dictionary.get('INDEX_RENAME_UNABLE'));
                }
              });
            });
        });

        // Change public state
        $(`#change-public-state_${number}`).click(function() 
        {
            Utils.callServer("map/changePublicState", "POST", {user : localStorage.getItem('session-id-histoatlas'), id : map.id, public : !map.public}).then((response) => 
            {
              map.public = !map.public;
              me.displayUserMap(map, idHtmlParent, number, true)
            }).catch((err) => { 
                if(err.responseJSON) {
                    toastr.error(Dictionary.get(err.responseJSON.error), Dictionary.get('INDEX_CHANGE_VISIBILITY_UNABLE'));
                }
                else {
                    toastr.error("", Dictionary.get('INDEX_CHANGE_VISIBILITY_UNABLE'));
                }
            });
        });

        // Change editable state
        $(`#change-editable-state_${number}`).click(function() 
        {
            Utils.callServer("map/changeEditableState", "POST", {user : localStorage.getItem('session-id-histoatlas'), id : map.id, public_editable : !map.publicEditable}).then((result) => 
            {
              map.publicEditable = !map.publicEditable;
              me.displayUserMap(map, idHtmlParent, number, true)
            }).catch((err) => { 
                if(err.responseJSON) {
                    toastr.error(Dictionary.get(err.responseJSON.error), Dictionary.get('INDEX_CHANGE_VISIBILITY_UNABLE'));
                }
                else {
                    toastr.error("", Dictionary.get('INDEX_CHANGE_VISIBILITY_UNABLE'));
                }
            });
        });

        // Delete map management
        $(`#delete_${number}`).click(function() 
        {
            let mapName = map.name;

            if (window.confirm(`${Dictionary.get("INDEX_MAP_DELETE_CONFIRM")} "${mapName}" ?`))
            {
              Utils.callServer("map/", "DELETE", {user : localStorage.getItem('session-id-histoatlas'), id : map.id}).then((result) => 
              {
                document.location.href="index.html";
              }).catch((err) => { 
                if(err.responseJSON) {
                    toastr.error(Dictionary.get(err.responseJSON.error), Dictionary.get('INDEX_DELETE_UNABLE'));
                }
                else {
                    toastr.error("", Dictionary.get('INDEX_DELETE_UNABLE'));
                }
              });
            }
        });
        
        // Manage copy iframe
        if(map.public)
        {
          $(`#iframe-publicmap_${map.id}`).on("click", function() 
          {
              me.copyIFrame(map.id);
          });
        }

        // Click on category = displays category selection and save management
        $(`#map-frame-category_${number}`).on("click", function() 
        {
            let categorySelect = $(`#map-frame-category_${number}`).children(".category-select");

            if(categorySelect.length == 0) 
            {
                let content = `<select id="category_select_${number}" class="category-select">
                      <option value=""></option>
                      <option value="history">History</option>
                      <option value="present">Present</option>
                      <option value="uchrony">Uchrony</option>
                    </select>`;

                $(`#map-frame-category_${number}`).html(content);

                $(`#category_select_${number}`).val(map.category).change();

                $(`#category_select_${number}`).change(function(e)
                {
                  Utils.callServer("map/changeCategory", "POST", {user : localStorage.getItem('session-id-histoatlas'), id : map.id, newCategory : e.target.value}).then((result) => 
                  {
                    map.category = e.target.value;
                    me.displayUserMap(map, idHtmlParent, number, true)

                  }).catch((err) => { 
                    if(err.responseJSON) {
                        toastr.error(Dictionary.get(err.responseJSON.error), Dictionary.get('INDEX_RENAME_UNABLE'));
                    }
                    else {
                        toastr.error("", Dictionary.get('INDEX_RENAME_UNABLE'));
                    }
                  });
                });
            }
        });
    }

    /**
     * Copy in iFrame 
     * @param {Number}           number                 The number of the element
     */
    copyIFrame(number) {
        let urlArray = window.location.href.split("/");
        urlArray.pop();
        const websiteUrl = urlArray.join("/");
        let urlIFrame = `<iframe id="histoatlas" title="Histo Atlas" width="600" height="400" src="${websiteUrl}/histoAtlas.html?mapId=${number}&edit=false&defaultFullScreen=true&lang=${Dictionary.lang}"> </iframe>`;
        navigator.clipboard.writeText(urlIFrame);

        toastr.success("", Dictionary.get("INDEX_MAP_COPY_IFRAME"));
    }
}