const video = document.getElementById('video');
const canvas = document.getElementById('canvas');
const captureButton = document.getElementById('capture');
const validateButton = document.getElementById('validate');
const statusText = document.getElementById('status-text');

let knownFaceDescriptors = [];
let capturedImageDescriptor = null;
const cam = video;

async function loadLabels() {
    const labels = ['Paulo', 'Thiane', 'Nathalia', 'Wellington', 'Gabriela','Nayara'];
    for (const label of labels) {
        const imgUrl = `./labels/${label}/1.jpeg`; // Ajuste o caminho aqui
        const img = await faceapi.fetchImage(imgUrl);
        const descriptors = await faceapi.detectSingleFace(img)
            .withFaceLandmarks()
            .withFaceDescriptor();
        knownFaceDescriptors.push(descriptors);
    }
}

Promise.all([
    faceapi.nets.tinyFaceDetector.loadFromUri('/models'),
    faceapi.nets.faceLandmark68Net.loadFromUri('/models'),
    faceapi.nets.faceRecognitionNet.loadFromUri('/models'),
    faceapi.nets.faceExpressionNet.loadFromUri('/models'),
    faceapi.nets.ageGenderNet.loadFromUri('/models'),
    faceapi.nets.ssdMobilenetv1.loadFromUri('/models'),
]).then(() => {
    loadLabels().then(startVideo); // Carregar os rótulos antes de iniciar o vídeo
});

async function startVideo() {
    const constraints = { video: true };

    try {
        let stream = await navigator.mediaDevices.getUserMedia(constraints);
        cam.srcObject = stream;
        cam.onloadedmetadata = e => {
            cam.play();
        }
    } catch (err) {
        console.error(err);
    }
}

// Função de captura de tela
// Função de captura de tela
captureButton.addEventListener('click', () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Desenhar o vídeo no canvas (captura)
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Pausar o vídeo
    video.pause();

    // Exibir o canvas com a imagem capturada
    canvas.style.display = 'block';

    statusText.textContent = "Imagem capturada! Agora, valide o usuário.";

    // Não volta o vídeo automaticamente; agora aguarda o clique em "Validar"
});

// Função de validação de usuário
validateButton.addEventListener('click', async () => {
    const context = canvas.getContext('2d');
    canvas.width = video.videoWidth;
    canvas.height = video.videoHeight;

    // Captura da imagem atual no vídeo
    context.drawImage(video, 0, 0, canvas.width, canvas.height);

    // Processar a imagem para reconhecimento facial
    const capturedDetections = await faceapi.detectSingleFace(canvas)
        .withFaceLandmarks()
        .withFaceDescriptor();

    if (capturedDetections) {
        // Verifique se há rostos conhecidos armazenados
        const faceMatcher = new faceapi.FaceMatcher(knownFaceDescriptors, 0.6);
        const bestMatch = faceMatcher.findBestMatch(capturedDetections.descriptor);

        // Obtenha o nome do usuário salvo no localStorage
        const savedFirstName = localStorage.getItem('firstName');
        console.log(savedFirstName)

        let matchedName = "Desconhecido"; // Nome padrão se não encontrar correspondência
            if (bestMatch.label === 'person 1') {
                matchedName = 'Paulo';
            } else if (bestMatch.label === 'person 2') {
                matchedName = 'Thiane';
            } else if (bestMatch.label === 'person 3') {
                matchedName = 'Nathalia';
            } else if (bestMatch.label === 'person 4') {
                matchedName = 'Wellington';
            } else if (bestMatch.label === 'person 5') {
                matchedName = 'Gabriela';
            } else if (bestMatch.label === 'person 6') {
                matchedName = 'Nayara';
            }
        console.log(matchedName)

        // Verifique se o rosto capturado corresponde ao usuário registrado
        if (matchedName !== "unknown" && savedFirstName === matchedName) {
            statusText.textContent = `Bem-vindo, ${savedFirstName}! Validação bem-sucedida.`;
            // Redirecionar após validação
            setTimeout(() => {
                window.location.href = 'dashboard.html';
            }, 2000);
        } else {
            statusText.textContent = "Validação falhou. Usuário não reconhecido.";
        }
    } else {
        statusText.textContent = "Nenhum rosto detectado. Tente novamente.";
    }

    video.play();
    canvas.style.display = 'none';
});

cam.addEventListener('play', () => {
    const canvas = faceapi.createCanvasFromMedia(cam);
    document.body.append(canvas);

    const displaySize = { width: video.videoWidth, height: video.videoHeight }; 
    faceapi.matchDimensions(canvas, displaySize);

    setInterval(async () => {
        const detections = await faceapi.detectAllFaces(
            cam,
            new faceapi.TinyFaceDetectorOptions()
        )
        .withFaceLandmarks()
        .withFaceExpressions()
        .withAgeAndGender()
        .withFaceDescriptors();

        const resizedDetections = faceapi.resizeResults(detections, displaySize);
        canvas.getContext("2d").clearRect(0, 0, canvas.width, canvas.height);

        faceapi.draw.drawDetections(canvas, resizedDetections);
        faceapi.draw.drawFaceLandmarks(canvas, resizedDetections);
        faceapi.draw.drawFaceExpressions(canvas, resizedDetections);

        resizedDetections.forEach(result => {
            const { age, gender } = result;
            const box = result.detection.box;
            const text = `Idade: ${Math.round(age)} anos, Gênero: ${gender}`;
            new faceapi.draw.DrawTextField([text], { x: box.x + box.width, y: box.y }).draw(canvas);
        });

          // Comparar os rostos detectados com os rostos conhecidos
          resizedDetections.forEach(result => {
            const faceMatcher = new faceapi.FaceMatcher(knownFaceDescriptors, 0.7);
            const bestMatch = faceMatcher.findBestMatch(result.descriptor);
            const box = result.detection.box;

            // Usar lógica para mapear o resultado para os nomes correspondentes
            let matchedName = "Desconhecido"; // Nome padrão se não encontrar correspondência
            if (bestMatch.label === 'person 1') {
                matchedName = 'Paulo';
            } else if (bestMatch.label === 'person 2') {
                matchedName = 'Thiane';
            } else if (bestMatch.label === 'person 3') {
                matchedName = 'Nathalia';
            } else if (bestMatch.label === 'person 4') {
                matchedName = 'Wellington';
            } else if (bestMatch.label === 'person 5') {
                matchedName = 'Gabriela';
            }  else if (bestMatch.label === 'person 6') {
                matchedName = 'Nayara';
            }

            // Desenhar o nome correspondente no canvas
            new faceapi.draw.DrawTextField([matchedName], box.bottomRight).draw(canvas);
        });

    }, 100);
});
