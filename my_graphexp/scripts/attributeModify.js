let firstAttributeClick = false
let rules = {}
let currentLabel = ""

function showAttributePopUp(){
    $("#popUpAttributes").addClass("visible")
    $("#popUpAttributes").removeClass("hidden")

   graphioGremlin.getLabels(getLabelsHandler)

}

function getLabelsHandler(data){
    var secondKey = Object.keys(data)[1]; //fetched the key at second index
    let labels = data[secondKey]
    let toPrint = "<br> <div class=\"row\">\n" +
        "            <div class=\"input-field col s12\">" +
        "                <select id='selectLabel' onchange='displayModifiers($(\"#selectLabel\").val())'> <option value=\"\" disabled selected>Label</option>"
    labels.forEach(v => toPrint+="<option value=\""+v+"\">"+v+"</option>")
    toPrint+= "</select>" +
        "  <label>Scegli la tipologia nodo da modificare</label>" +
        "  </div>" +
        "</div>"

    $("#attributesDiv").html(toPrint)
    $('select').formSelect();

}

function displayModifiers(label){
    currentLabel = label
    let toPrint = "<div class='row'>"
    for (const color of defaultColors) {
        toPrint += "<div class=\"col s1\">\n" +
            "                    <a class=\"smaller-dot-general dummyclass \" style='background-color: " + color + "' onclick=\"setDotActive(this)\"></a>\n" +
            "                </div>"
    }
    for (const color of getAllUniqueNodeColors()) {
        toPrint += "<div class=\"col s1\"><a class=\"smaller-dot-general dummyclass\" style='background-color: " + color + "' onclick=\"setDotActive(this)\"></a></div>"
    }
    toPrint+="</div> <br>"

    toPrint+="</div><div class='row'>"
    toPrint+="<div class=\"input-field col s7\">" +
        "                    <input placeholder=\"30\" value='30' id=\"allNodeDimension\" type=\"number\" class=\"validate\">" +
        "                    <label class=\"unselectable\" for=\"allNodeDimension\">Dimensione nodo</label>" +
        "                </div></div>"
    toPrint+='<div class="row valign-wrapper">\n' +
        '        <div class="input-field col s10">\n' +
        '          <input type="text" id="autocomplete-input" class="autocomplete">\n' +
        '          <label for="autocomplete-input">Icona</label>\n' +
        '        </div>' +
        '           <div class="col s2 tooltipped" data-tooltip="Le icone utilizzate sono le icone Google. Per maggiori informazioni: https://fonts.google.com/icons" data-position="right"  >' +
        '            <i class="material-icons grey-text small">info</i>' +
        '       </div>' +
        '      </div>' +
        '<div class="row"> <div class="col s12 center"></div><a onclick="setRules()" class="waves-effect waves-light lightBlue btn">Modifica</a></div>'

    $("#modifiersDiv").html(toPrint)
    $('select').formSelect();
    M.updateTextFields();
    $('.tooltipped').tooltip();


    $('input.autocomplete').autocomplete({
        data: {
            "3d_rotation": null,
            "ac_unit": null,
            "access_alarm": null,
            "access_alarms": null,
            "access_time": null,
            "accessibility": null,
            "accessible": null,
            "account_balance": null,
            "account_balance_wallet": null,
            "account_box": null,
            "account_circle": null,
            "adb": null,
            "add": null,
            "add_a_photo": null,
            "add_alarm": null,
            "add_alert": null,
            "add_box": null,
            "add_circle": null,
            "add_circle_outline": null,
            "add_location": null,
            "add_shopping_cart": null,
            "add_to_photos": null,
            "add_to_queue": null,
            "adjust": null,
            "airline_seat_flat": null,
            "airline_seat_flat_angled": null,
            "airline_seat_individual_suite": null,
            "airline_seat_legroom_extra": null,
            "airline_seat_legroom_normal": null,
            "airline_seat_legroom_reduced": null,
            "airline_seat_recline_extra": null,
            "airline_seat_recline_normal": null,
            "airplanemode_active": null,
            "airplanemode_inactive": null,
            "airplay": null,
            "airport_shuttle": null,
            "alarm": null,
            "alarm_add": null,
            "alarm_off": null,
            "alarm_on": null,
            "album": null,
            "all_inclusive": null,
            "all_out": null,
            "android": null,
            "announcement": null,
            "apps": null,
            "archive": null,
            "arrow_back": null,
            "arrow_downward": null,
            "arrow_drop_down": null,
            "arrow_drop_down_circle": null,
            "arrow_drop_up": null,
            "arrow_forward": null,
            "arrow_upward": null,
            "art_track": null,
            "aspect_ratio": null,
            "assessment": null,
            "assignment": null,
            "assignment_ind": null,
            "assignment_late": null,
            "assignment_return": null,
            "assignment_returned": null,
            "assignment_turned_in": null,
            "assistant": null,
            "assistant_photo": null,
            "attach_file": null,
            "attach_money": null,
            "attachment": null,
            "audiotrack": null,
            "autorenew": null,
            "av_timer": null,
            "backspace": null,
            "backup": null,
            "battery_alert": null,
            "battery_charging_full": null,
            "battery_full": null,
            "battery_std": null,
            "battery_unknown": null,
            "beach_access": null,
            "beenhere": null,
            "block": null,
            "bluetooth": null,
            "bluetooth_audio": null,
            "bluetooth_connected": null,
            "bluetooth_disabled": null,
            "bluetooth_searching": null,
            "blur_circular": null,
            "blur_linear": null,
            "blur_off": null,
            "blur_on": null,
            "book": null,
            "bookmark": null,
            "bookmark_border": null,
            "border_all": null,
            "border_bottom": null,
            "border_clear": null,
            "border_color": null,
            "border_horizontal": null,
            "border_inner": null,
            "border_left": null,
            "border_outer": null,
            "border_right": null,
            "border_style": null,
            "border_top": null,
            "border_vertical": null,
            "branding_watermark": null,
            "brightness_1": null,
            "brightness_2": null,
            "brightness_3": null,
            "brightness_4": null,
            "brightness_5": null,
            "brightness_6": null,
            "brightness_7": null,
            "brightness_auto": null,
            "brightness_high": null,
            "brightness_low": null,
            "brightness_medium": null,
            "broken_image": null,
            "brush": null,
            "bubble_chart": null,
            "bug_report": null,
            "build": null,
            "burst_mode": null,
            "business": null,
            "business_center": null,
            "cached": null,
            "cake": null,
            "call": null,
            "call_end": null,
            "call_made": null,
            "call_merge": null,
            "call_missed": null,
            "call_missed_outgoing": null,
            "call_received": null,
            "call_split": null,
            "call_to_action": null,
            "camera": null,
            "camera_alt": null,
            "camera_enhance": null,
            "camera_front": null,
            "camera_rear": null,
            "camera_roll": null,
            "cancel": null,
            "card_giftcard": null,
            "card_membership": null,
            "card_travel": null,
            "casino": null,
            "cast": null,
            "cast_connected": null,
            "center_focus_strong": null,
            "center_focus_weak": null,
            "change_history": null,
            "chat": null,
            "chat_bubble": null,
            "chat_bubble_outline": null,
            "check": null,
            "check_box": null,
            "check_box_outline_blank": null,
            "check_circle": null,
            "chevron_left": null,
            "chevron_right": null,
            "child_care": null,
            "child_friendly": null,
            "chrome_reader_mode": null,
            "class": null,
            "clear": null,
            "clear_all": null,
            "close": null,
            "closed_caption": null,
            "cloud": null,
            "cloud_circle": null,
            "cloud_done": null,
            "cloud_download": null,
            "cloud_off": null,
            "cloud_queue": null,
            "cloud_upload": null,
            "code": null,
            "collections": null,
            "collections_bookmark": null,
            "color_lens": null,
            "colorize": null,
            "comment": null,
            "compare": null,
            "compare_arrows": null,
            "computer": null,
            "confirmation_number": null,
            "contact_mail": null,
            "contact_phone": null,
            "contacts": null,
            "content_copy": null,
            "content_cut": null,
            "content_paste": null,
            "control_point": null,
            "control_point_duplicate": null,
            "copyright": null,
            "create": null,
            "create_new_folder": null,
            "credit_card": null,
            "crop": null,
            "crop_16_9": null,
            "crop_3_2": null,
            "crop_5_4": null,
            "crop_7_5": null,
            "crop_din": null,
            "crop_free": null,
            "crop_landscape": null,
            "crop_original": null,
            "crop_portrait": null,
            "crop_rotate": null,
            "crop_square": null,
            "dashboard": null,
            "data_usage": null,
            "date_range": null,
            "dehaze": null,
            "delete": null,
            "delete_forever": null,
            "delete_sweep": null,
            "description": null,
            "desktop_mac": null,
            "desktop_windows": null,
            "details": null,
            "developer_board": null,
            "developer_mode": null,
            "device_hub": null,
            "devices": null,
            "devices_other": null,
            "dialer_sip": null,
            "dialpad": null,
            "directions": null,
            "directions_bike": null,
            "directions_boat": null,
            "directions_bus": null,
            "directions_car": null,
            "directions_railway": null,
            "directions_run": null,
            "directions_subway": null,
            "directions_transit": null,
            "directions_walk": null,
            "disc_full": null,
            "dns": null,
            "do_not_disturb": null,
            "do_not_disturb_alt": null,
            "do_not_disturb_off": null,
            "do_not_disturb_on": null,
            "dock": null,
            "domain": null,
            "done": null,
            "done_all": null,
            "donut_large": null,
            "donut_small": null,
            "drafts": null,
            "drag_handle": null,
            "drive_eta": null,
            "dvr": null,
            "edit": null,
            "edit_location": null,
            "eject": null,
            "email": null,
            "enhanced_encryption": null,
            "equalizer": null,
            "error": null,
            "error_outline": null,
            "euro_symbol": null,
            "ev_station": null,
            "event": null,
            "event_available": null,
            "event_busy": null,
            "event_note": null,
            "event_seat": null,
            "exit_to_app": null,
            "expand_less": null,
            "expand_more": null,
            "explicit": null,
            "explore": null,
            "exposure": null,
            "exposure_neg_1": null,
            "exposure_neg_2": null,
            "exposure_plus_1": null,
            "exposure_plus_2": null,
            "exposure_zero": null,
            "extension": null,
            "face": null,
            "fast_forward": null,
            "fast_rewind": null,
            "favorite": null,
            "favorite_border": null,
            "featured_play_list": null,
            "featured_video": null,
            "feedback": null,
            "fiber_dvr": null,
            "fiber_manual_record": null,
            "fiber_new": null,
            "fiber_pin": null,
            "fiber_smart_record": null,
            "file_download": null,
            "file_upload": null,
            "filter": null,
            "filter_1": null,
            "filter_2": null,
            "filter_3": null,
            "filter_4": null,
            "filter_5": null,
            "filter_6": null,
            "filter_7": null,
            "filter_8": null,
            "filter_9": null,
            "filter_9_plus": null,
            "filter_b_and_w": null,
            "filter_center_focus": null,
            "filter_drama": null,
            "filter_frames": null,
            "filter_hdr": null,
            "filter_list": null,
            "filter_none": null,
            "filter_tilt_shift": null,
            "filter_vintage": null,
            "find_in_page": null,
            "find_replace": null,
            "fingerprint": null,
            "first_page": null,
            "fitness_center": null,
            "flag": null,
            "flare": null,
            "flash_auto": null,
            "flash_off": null,
            "flash_on": null,
            "flight": null,
            "flight_land": null,
            "flight_takeoff": null,
            "flip": null,
            "flip_to_back": null,
            "flip_to_front": null,
            "folder": null,
            "folder_open": null,
            "folder_shared": null,
            "folder_special": null,
            "font_download": null,
            "format_align_center": null,
            "format_align_justify": null,
            "format_align_left": null,
            "format_align_right": null,
            "format_bold": null,
            "format_clear": null,
            "format_color_fill": null,
            "format_color_reset": null,
            "format_color_text": null,
            "format_indent_decrease": null,
            "format_indent_increase": null,
            "format_italic": null,
            "format_line_spacing": null,
            "format_list_bulleted": null,
            "format_list_numbered": null,
            "format_paint": null,
            "format_quote": null,
            "format_shapes": null,
            "format_size": null,
            "format_strikethrough": null,
            "format_textdirection_l_to_r": null,
            "format_textdirection_r_to_l": null,
            "format_underlined": null,
            "forum": null,
            "forward": null,
            "forward_10": null,
            "forward_30": null,
            "forward_5": null,
            "free_breakfast": null,
            "fullscreen": null,
            "fullscreen_exit": null,
            "functions": null,
            "g_translate": null,
            "gamepad": null,
            "games": null,
            "gavel": null,
            "gesture": null,
            "get_app": null,
            "gif": null,
            "golf_course": null,
            "gps_fixed": null,
            "gps_not_fixed": null,
            "gps_off": null,
            "grade": null,
            "gradient": null,
            "grain": null,
            "graphic_eq": null,
            "grid_off": null,
            "grid_on": null,
            "group": null,
            "group_add": null,
            "group_work": null,
            "hd": null,
            "hdr_off": null,
            "hdr_on": null,
            "hdr_strong": null,
            "hdr_weak": null,
            "headset": null,
            "headset_mic": null,
            "healing": null,
            "hearing": null,
            "help": null,
            "help_outline": null,
            "high_quality": null,
            "highlight": null,
            "highlight_off": null,
            "history": null,
            "home": null,
            "hot_tub": null,
            "hotel": null,
            "hourglass_empty": null,
            "hourglass_full": null,
            "http": null,
            "https": null,
            "image": null,
            "image_aspect_ratio": null,
            "import_contacts": null,
            "import_export": null,
            "important_devices": null,
            "inbox": null,
            "indeterminate_check_box": null,
            "info": null,
            "info_outline": null,
            "input": null,
            "insert_chart": null,
            "insert_comment": null,
            "insert_drive_file": null,
            "insert_emoticon": null,
            "insert_invitation": null,
            "insert_link": null,
            "insert_photo": null,
            "invert_colors": null,
            "invert_colors_off": null,
            "iso": null,
            "keyboard": null,
            "keyboard_arrow_down": null,
            "keyboard_arrow_left": null,
            "keyboard_arrow_right": null,
            "keyboard_arrow_up": null,
            "keyboard_backspace": null,
            "keyboard_capslock": null,
            "keyboard_hide": null,
            "keyboard_return": null,
            "keyboard_tab": null,
            "keyboard_voice": null,
            "kitchen": null,
            "label": null,
            "label_outline": null,
            "landscape": null,
            "language": null,
            "laptop": null,
            "laptop_chromebook": null,
            "laptop_mac": null,
            "laptop_windows": null,
            "last_page": null,
            "launch": null,
            "layers": null,
            "layers_clear": null,
            "leak_add": null,
            "leak_remove": null,
            "lens": null,
            "library_add": null,
            "library_books": null,
            "library_music": null,
            "lightbulb_outline": null,
            "line_style": null,
            "line_weight": null,
            "linear_scale": null,
            "link": null,
            "linked_camera": null,
            "list": null,
            "live_help": null,
            "live_tv": null,
            "local_activity": null,
            "local_airport": null,
            "local_atm": null,
            "local_bar": null,
            "local_cafe": null,
            "local_car_wash": null,
            "local_convenience_store": null,
            "local_dining": null,
            "local_drink": null,
            "local_florist": null,
            "local_gas_station": null,
            "local_grocery_store": null,
            "local_hospital": null,
            "local_hotel": null,
            "local_laundry_service": null,
            "local_library": null,
            "local_mall": null,
            "local_movies": null,
            "local_offer": null,
            "local_parking": null,
            "local_pharmacy": null,
            "local_phone": null,
            "local_pizza": null,
            "local_play": null,
            "local_post_office": null,
            "local_printshop": null,
            "local_see": null,
            "local_shipping": null,
            "local_taxi": null,
            "location_city": null,
            "location_disabled": null,
            "location_off": null,
            "location_on": null,
            "location_searching": null,
            "lock": null,
            "lock_open": null,
            "lock_outline": null,
            "looks": null,
            "looks_3": null,
            "looks_4": null,
            "looks_5": null,
            "looks_6": null,
            "looks_one": null,
            "looks_two": null,
            "loop": null,
            "loupe": null,
            "low_priority": null,
            "loyalty": null,
            "mail": null,
            "mail_outline": null,
            "map": null,
            "markunread": null,
            "markunread_mailbox": null,
            "memory": null,
            "menu": null,
            "merge_type": null,
            "message": null,
            "mic": null,
            "mic_none": null,
            "mic_off": null,
            "mms": null,
            "mode_comment": null,
            "mode_edit": null,
            "monetization_on": null,
            "money_off": null,
            "monochrome_photos": null,
            "mood": null,
            "mood_bad": null,
            "more": null,
            "more_horiz": null,
            "more_vert": null,
            "motorcycle": null,
            "mouse": null,
            "move_to_inbox": null,
            "movie": null,
            "movie_creation": null,
            "movie_filter": null,
            "multiline_chart": null,
            "music_note": null,
            "music_video": null,
            "my_location": null,
            "nature": null,
            "nature_people": null,
            "navigate_before": null,
            "navigate_next": null,
            "navigation": null,
            "near_me": null,
            "network_cell": null,
            "network_check": null,
            "network_locked": null,
            "network_wifi": null,
            "new_releases": null,
            "next_week": null,
            "nfc": null,
            "no_encryption": null,
            "no_sim": null,
            "not_interested": null,
            "note": null,
            "note_add": null,
            "notifications": null,
            "notifications_active": null,
            "notifications_none": null,
            "notifications_off": null,
            "notifications_paused": null,
            "offline_pin": null,
            "ondemand_video": null,
            "opacity": null,
            "open_in_browser": null,
            "open_in_new": null,
            "open_with": null,
            "pages": null,
            "pageview": null,
            "palette": null,
            "pan_tool": null,
            "panorama": null,
            "panorama_fish_eye": null,
            "panorama_horizontal": null,
            "panorama_vertical": null,
            "panorama_wide_angle": null,
            "party_mode": null,
            "pause": null,
            "pause_circle_filled": null,
            "pause_circle_outline": null,
            "payment": null,
            "people": null,
            "people_outline": null,
            "perm_camera_mic": null,
            "perm_contact_calendar": null,
            "perm_data_setting": null,
            "perm_device_information": null,
            "perm_identity": null,
            "perm_media": null,
            "perm_phone_msg": null,
            "perm_scan_wifi": null,
            "person": null,
            "person_add": null,
            "person_outline": null,
            "person_pin": null,
            "person_pin_circle": null,
            "personal_video": null,
            "pets": null,
            "phone": null,
            "phone_android": null,
            "phone_bluetooth_speaker": null,
            "phone_forwarded": null,
            "phone_in_talk": null,
            "phone_iphone": null,
            "phone_locked": null,
            "phone_missed": null,
            "phone_paused": null,
            "phonelink": null,
            "phonelink_erase": null,
            "phonelink_lock": null,
            "phonelink_off": null,
            "phonelink_ring": null,
            "phonelink_setup": null,
            "photo": null,
            "photo_album": null,
            "photo_camera": null,
            "photo_filter": null,
            "photo_library": null,
            "photo_size_select_actual": null,
            "photo_size_select_large": null,
            "photo_size_select_small": null,
            "picture_as_pdf": null,
            "picture_in_picture": null,
            "picture_in_picture_alt": null,
            "pie_chart": null,
            "pie_chart_outlined": null,
            "pin_drop": null,
            "place": null,
            "play_arrow": null,
            "play_circle_filled": null,
            "play_circle_outline": null,
            "play_for_work": null,
            "playlist_add": null,
            "playlist_add_check": null,
            "playlist_play": null,
            "plus_one": null,
            "poll": null,
            "polymer": null,
            "pool": null,
            "portable_wifi_off": null,
            "portrait": null,
            "power": null,
            "power_input": null,
            "power_settings_new": null,
            "pregnant_woman": null,
            "present_to_all": null,
            "print": null,
            "priority_high": null,
            "public": null,
            "publish": null,
            "query_builder": null,
            "question_answer": null,
            "queue": null,
            "queue_music": null,
            "queue_play_next": null,
            "radio": null,
            "radio_button_checked": null,
            "radio_button_unchecked": null,
            "rate_review": null,
            "receipt": null,
            "recent_actors": null,
            "record_voice_over": null,
            "redeem": null,
            "redo": null,
            "refresh": null,
            "remove": null,
            "remove_circle": null,
            "remove_circle_outline": null,
            "remove_from_queue": null,
            "remove_red_eye": null,
            "remove_shopping_cart": null,
            "reorder": null,
            "repeat": null,
            "repeat_one": null,
            "replay": null,
            "replay_10": null,
            "replay_30": null,
            "replay_5": null,
            "reply": null,
            "reply_all": null,
            "report": null,
            "report_problem": null,
            "restaurant": null,
            "restaurant_menu": null,
            "restore": null,
            "restore_page": null,
            "ring_volume": null,
            "room": null,
            "room_service": null,
            "rotate_90_degrees_ccw": null,
            "rotate_left": null,
            "rotate_right": null,
            "rounded_corner": null,
            "router": null,
            "rowing": null,
            "rss_feed": null,
            "rv_hookup": null,
            "satellite": null,
            "save": null,
            "scanner": null,
            "schedule": null,
            "school": null,
            "screen_lock_landscape": null,
            "screen_lock_portrait": null,
            "screen_lock_rotation": null,
            "screen_rotation": null,
            "screen_share": null,
            "sd_card": null,
            "sd_storage": null,
            "search": null,
            "security": null,
            "select_all": null,
            "send": null,
            "sentiment_dissatisfied": null,
            "sentiment_neutral": null,
            "sentiment_satisfied": null,
            "sentiment_very_dissatisfied": null,
            "sentiment_very_satisfied": null,
            "settings": null,
            "settings_applications": null,
            "settings_backup_restore": null,
            "settings_bluetooth": null,
            "settings_brightness": null,
            "settings_cell": null,
            "settings_ethernet": null,
            "settings_input_antenna": null,
            "settings_input_component": null,
            "settings_input_composite": null,
            "settings_input_hdmi": null,
            "settings_input_svideo": null,
            "settings_overscan": null,
            "settings_phone": null,
            "settings_power": null,
            "settings_remote": null,
            "settings_system_daydream": null,
            "settings_voice": null,
            "share": null,
            "shop": null,
            "shop_two": null,
            "shopping_basket": null,
            "shopping_cart": null,
            "short_text": null,
            "show_chart": null,
            "shuffle": null,
            "signal_cellular_4_bar": null,
            "signal_cellular_connected_no_internet_4_bar": null,
            "signal_cellular_no_sim": null,
            "signal_cellular_null": null,
            "signal_cellular_off": null,
            "signal_wifi_4_bar": null,
            "signal_wifi_4_bar_lock": null,
            "signal_wifi_off": null,
            "sim_card": null,
            "sim_card_alert": null,
            "skip_next": null,
            "skip_previous": null,
            "slideshow": null,
            "slow_motion_video": null,
            "smartphone": null,
            "smoke_free": null,
            "smoking_rooms": null,
            "sms": null,
            "sms_failed": null,
            "snooze": null,
            "sort": null,
            "sort_by_alpha": null,
            "spa": null,
            "space_bar": null,
            "speaker": null,
            "speaker_group": null,
            "speaker_notes": null,
            "speaker_notes_off": null,
            "speaker_phone": null,
            "spellcheck": null,
            "star": null,
            "star_border": null,
            "star_half": null,
            "stars": null,
            "stay_current_landscape": null,
            "stay_current_portrait": null,
            "stay_primary_landscape": null,
            "stay_primary_portrait": null,
            "stop": null,
            "stop_screen_share": null,
            "storage": null,
            "store": null,
            "store_mall_directory": null,
            "straighten": null,
            "streetview": null,
            "strikethrough_s": null,
            "style": null,
            "subdirectory_arrow_left": null,
            "subdirectory_arrow_right": null,
            "subject": null,
            "subscriptions": null,
            "subtitles": null,
            "subway": null,
            "supervisor_account": null,
            "surround_sound": null,
            "swap_calls": null,
            "swap_horiz": null,
            "swap_vert": null,
            "swap_vertical_circle": null,
            "switch_camera": null,
            "switch_video": null,
            "sync": null,
            "sync_disabled": null,
            "sync_problem": null,
            "system_update": null,
            "system_update_alt": null,
            "tab": null,
            "tab_unselected": null,
            "tablet": null,
            "tablet_android": null,
            "tablet_mac": null,
            "tag_faces": null,
            "tap_and_play": null,
            "terrain": null,
            "text_fields": null,
            "text_format": null,
            "textsms": null,
            "texture": null,
            "theaters": null,
            "thumb_down": null,
            "thumb_up": null,
            "thumbs_up_down": null,
            "time_to_leave": null,
            "timelapse": null,
            "timeline": null,
            "timer": null,
            "timer_10": null,
            "timer_3": null,
            "timer_off": null,
            "title": null,
            "toc": null,
            "today": null,
            "toll": null,
            "tonality": null,
            "touch_app": null,
            "toys": null,
            "track_changes": null,
            "traffic": null,
            "train": null,
            "tram": null,
            "transfer_within_a_station": null,
            "transform": null,
            "translate": null,
            "trending_down": null,
            "trending_flat": null,
            "trending_up": null,
            "tune": null,
            "turned_in": null,
            "turned_in_not": null,
            "tv": null,
            "unarchive": null,
            "undo": null,
            "unfold_less": null,
            "unfold_more": null,
            "update": null,
            "usb": null,
            "verified_user": null,
            "vertical_align_bottom": null,
            "vertical_align_center": null,
            "vertical_align_top": null,
            "vibration": null,
            "video_call": null,
            "video_label": null,
            "video_library": null,
            "videocam": null,
            "videocam_off": null,
            "videogame_asset": null,
            "view_agenda": null,
            "view_array": null,
            "view_carousel": null,
            "view_column": null,
            "view_comfy": null,
            "view_compact": null,
            "view_day": null,
            "view_headline": null,
            "view_list": null,
            "view_module": null,
            "view_quilt": null,
            "view_stream": null,
            "view_week": null,
            "vignette": null,
            "visibility": null,
            "visibility_off": null,
            "voice_chat": null,
            "voicemail": null,
            "volume_down": null,
            "volume_mute": null,
            "volume_off": null,
            "volume_up": null,
            "vpn_key": null,
            "vpn_lock": null,
            "wallpaper": null,
            "warning": null,
            "watch": null,
            "watch_later": null,
            "wb_auto": null,
            "wb_cloudy": null,
            "wb_incandescent": null,
            "wb_iridescent": null,
            "wb_sunny": null,
            "wc": null,
            "web": null,
            "web_asset": null,
            "weekend": null,
            "whatshot": null,
            "widgets": null,
            "wifi": null,
            "wifi_lock": null,
            "wifi_tethering": null,
            "work": null,
            "wrap_text": null,
            "youtube_searched_for": null,
            "zoom_in": null,
            "zoom_out": null,
            "zoom_out_map": null
        },
        minLength: 0,
    });

}

function setDotActive(dot){
    dot = $(dot)
    if (dot.hasClass("smaller-dot-general-active"))
        return

    let currentActive = $(".smaller-dot-general-active")
    currentActive.addClass("smaller-dot-general")
    currentActive.removeClass("smaller-dot-general-active")

    dot.addClass("smaller-dot-general-active")
    dot.removeClass("smaller-dot-general")
}

function setRules(){

    let obj={}
    if ($('.smaller-dot-general-active').length!=0) {
        let dot = $('.smaller-dot-general-active')
        obj["color"] = dot.css("background-color")
        d3.selectAll("g.node")
            .filter(function(d){
                return graphShapes.node_text(d).toLowerCase() == currentLabel.toLowerCase()
            })
            .selectAll("circle").attr("fill", dot.css("background-color"))
            .attr("fill", dot.css("background-color"))
        dot.removeClass("smaller-dot-general-active")
        dot.addClass("smaller-dot-general")
    }

    if ($("#allNodeDimension").val()!="") {
        obj["dimension"] = $("#allNodeDimension").val()
        d3.selectAll("g.node")
            .filter(function(d){
                return graphShapes.node_text(d).toLowerCase() == currentLabel.toLowerCase()
            })
            .selectAll(".base_circle").attr("r", $("#allNodeDimension").val())

        d3.selectAll("g.node")
            .filter(function(d){
                return graphShapes.node_text(d).toLowerCase() == currentLabel.toLowerCase()
            })
            .selectAll(".Pin").attr("r", $("#allNodeDimension").val()/2)

        d3.selectAll("g.node")
            .filter(function(d){
                return graphShapes.node_text(d).toLowerCase() == currentLabel.toLowerCase()
            })
            .selectAll("text").style("font-size", $("#allNodeDimension").val()-19)
    }

    if ($("#autocomplete-input").val()!="") {
        obj["icon"] = $("#autocomplete-input").val()
        changeNodeText($("#autocomplete-input").val(), true)
    }
    rules[currentLabel]=obj
    graphShapes.updateTextColors()

}

function changeNodeText(icon, isAIcon){
    if (isAIcon){
        graphShapes.changeLabelTextInIcon(currentLabel, icon)

    }
}