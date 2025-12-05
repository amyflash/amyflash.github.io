document.addEventListener("DOMContentLoaded", function () {
  jQuery("body").delegate("#h5ap_shortcode_button", "click", function () {
    var tnc_file_uploader = wp
      .media({
        title: "Upload File",
        button: {
          text: "Insert",
        },
        library: { type: "audio" },
        multiple: false,
      })
      .on("select", function () {
        var attachment = tnc_file_uploader.state().get("selection").first().toJSON();
        wp.media.editor.insert('[h5ap_inline_player src="' + attachment?.url + '"]');
      })
      .open();
  });

  const inlinePlayers = document.querySelectorAll(".h5ap_inline_player");
  if (inlinePlayers) {
    Object.values(inlinePlayers).map((playerWrapper) => {
      const player = playerWrapper.querySelector("audio");
      const playBtn = playerWrapper.querySelector(".dashicons-controls-play");
      const pauseBtn = playerWrapper.querySelector(".dashicons-controls-pause");
      playBtn.onclick = function () {
        player.play();
      };
      pauseBtn.onclick = function () {
        player.pause();
      };

      player.addEventListener("play", function () {
        playBtn.style.display = "none";
        pauseBtn.style.display = "inline-block";
        // playerWrapper.classList.remove("paused");
        // playerWrapper.classList.add("playing");
      });
      player.addEventListener("pause", function () {
        // playerWrapper.classList.add("paused");
        // playerWrapper.classList.remove("playing");
        pauseBtn.style.display = "none";
        playBtn.style.display = "inline-block";
      });
    });
  }
});
