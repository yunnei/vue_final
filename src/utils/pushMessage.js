import emitter from "./emitter.js";

export default function (response, content) {
  if (response.data.success) {
    emitter.emit("push-message", {
      style: "success",
      content: `成功${content}`,
    });
  } else {
    const message =
      typeof response.data.message === "string"
        ? [response.data.message]
        : response.data.message;
    emitter.emit("push-message", {
      style: "danger",
      content: message.join("、"),
    });
  }
}
