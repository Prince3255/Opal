export const LoadVoiceFlowAgent = (userId) => {
  if (window.voiceFlowLoaded) return;
  window.voiceFlowLoaded = true;
  (function (d, t) {
    var v = d.createElement(t),
      s = d.getElementsByTagName(t)[0];
    v.onload = function () {
      window.voiceflow.chat.load({
        verify: { projectID: process.env.NEXT_PUBLIC_VOICE_FLOW_KEY },
        url: "https://general-runtime.voiceflow.com",
        versionID: "production",
        assistant: {
          stylesheet: 'https://cdn.jsdelivr.net/gh/Prince3255/css@main/index.css'
        },
        launch: {
          event: {
            type: "launch",
            payload: {
              user_id: userId,
            },
          },
        },
        voice: {
          url: "https://runtime-api.voiceflow.com",
        },
      });
    };
    v.src = "https://cdn.voiceflow.com/widget-next/bundle.mjs";
    v.type = "text/javascript";
    s.parentNode.insertBefore(v, s);
  })(document, "script");
};
