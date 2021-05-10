const video = document.getElementById("video");
const canvas = document.getElementById("canvas");

function startVideo() {
    video.width = 640;
    video.height = 360;

    navigator.getUserMedia(
        { video: {} },
        stream => video.srcObject = stream,
        err => console.error(err)
    )
}

startVideo();

const runPosenet = async () => {
    const net = await posenet.load({
      inputResolution:{ width: 640, height: 480 },
      scale: 0.5,
    });

    setInterval(() => {
        detect(net);
    }, 100)
};

const detect = async (net) => {
    const pose = await net.estimateSinglePose(video);
    console.log(pose);

    drawCanvas(pose);
}

video.addEventListener('loadeddata', (event) => {
    runPosenet();
});

const drawCanvas = (pose) => {
    const ctx = canvas.getContext("2d");
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    drawKeypoints(pose["keypoints"], ctx);
}

function drawKeypoints(keypoints, ctx) {

    ctx.fillStyle = "#ff0000";
    ctx.strokeStyle = "#000000";

    keypoints.forEach(elem => {
        const { y, x } = elem.position;

        ctx.beginPath();
        ctx.arc(x, y, 7, 0, 2 * Math.PI);
        ctx.stroke();
        ctx.fill();
        ctx.closePath();

        /*
        if (elem.part == "nose") {
            const { y, x } = elem.position;
    
            ctx.beginPath();
            ctx.arc(x, y, 30, 0, 2 * Math.PI);
            ctx.stroke();
            ctx.fill();
            ctx.closePath();
        }
        */
    });
}
/*
video.addEventListener("play", () => {
    
})
*/