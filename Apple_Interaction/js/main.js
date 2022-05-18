(() => {

    let yOffset = 0; // window.pageYOffset 대신 쓸 변수
    let prevScrollHeight = 0; //현재 스크롤 위치(yOffset)보다 이전에 위치한 스크롤 색션들의 스크롤 높이값의 합
    let currentScene = 0; // 현재 활성화된(눈 앞에 보고 있는) 씬(scroll-section)
    let enterNewScene = false; // 새로운 scene이 시작된 순간 true

    const sceneInfo = [
        {
            // 0
            type: 'sticky',
            heightNum: 5, // 브라우저 높이의 5배로 scrollHeight 세팅
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll__section__0'),
                messageA: document.querySelector('#scroll__section__0 .main__message.a'),
                messageB: document.querySelector('#scroll__section__0 .main__message.b'),
                messageC: document.querySelector('#scroll__section__0 .main__message.c'),
                messageD: document.querySelector('#scroll__section__0 .main__message.d'),
                canvas: document.querySelector('#video__canvas__0'),
                context: document.querySelector('#video__canvas__0').getContext('2d'),
                videoImages: [],
            },
            values: {
                videoImageCount: 300,
                imageSequence: [0, 299],
                canvas__opacity: [1, 0, { start: 0.9, end: 1 }],
                messageA__opacity__in: [0, 1, { start: 0.1, end: 0.2 }],
                messageB__opacity__in: [0, 1, { start: 0.3, end: 0.4 }],
                messageC__opacity__in: [0, 1, { start: 0.5, end: 0.6 }],
                messageD__opacity__in: [0, 1, { start: 0.7, end: 0.8 }],
                messageA__translateY__in: [20, 0, { start: 0.1, end: 0.2 }],
                messageB__translateY__in: [20, 0, { start: 0.3, end: 0.4 }],
                messageC__translateY__in: [20, 0, { start: 0.5, end: 0.6 }],
                messageD__translateY__in: [20, 0, { start: 0.7, end: 0.8 }],
                messageA__opacity__out: [1, 0, { start: 0.25, end: 0.3 }],
                messageB__opacity__out: [1, 0, { start: 0.45, end: 0.5 }],
                messageC__opacity__out: [1, 0, { start: 0.65, end: 0.7 }],
                messageD__opacity__out: [1, 0, { start: 0.85, end: 0.9 }],
                messageA__translateY__out: [0, -20, { start: 0.25, end: 0.3 }],
                messageB__translateY__out: [0, -20, { start: 0.45, end: 0.5 }],
                messageC__translateY__out: [0, -20, { start: 0.65, end: 0.7 }],
                messageD__translateY__out: [0, -20, { start: 0.85, end: 0.9 }],
            }
        },
        {
            // 1
            type: 'normal',
            // heightNum: 5, // type normal에서는 필요 없음.
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll__section__1')
            }
        },
        {
            // 2
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll__section__2'),
                messageA: document.querySelector('#scroll__section__2 .a'),
                messageB: document.querySelector('#scroll__section__2 .b'),
                messageC: document.querySelector('#scroll__section__2 .c'),
                pinB: document.querySelector('#scroll__section__2 .b .pin'),
                pinC: document.querySelector('#scroll__section__2 .c .pin'),
                canvas: document.querySelector('#video__canvas__1'),
                context: document.querySelector('#video__canvas__1').getContext('2d'),
                videoImages: [],
            },
            values: {
                videoImageCount: 960,
                imageSequence: [0, 959],
                canvas__opacity__in: [0, 1, { start: 0, end: 0.1 }],
                canvas__opacity__out: [1, 0, { start: 0.95, end: 1 }],
                messageA__translateY__in: [20, 0, { start: 0.15, end: 0.2 }],
                messageB__translateY__in: [30, 0, { start: 0.5, end: 0.55 }],
                messageC__translateY__in: [30, 0, { start: 0.72, end: 0.77 }],
                messageA__opacity__in: [0, 1, { start: 0.15, end: 0.2 }],
                messageB__opacity__in: [0, 1, { start: 0.5, end: 0.55 }],
                messageC__opacity__in: [0, 1, { start: 0.72, end: 0.77 }],
                messageA__translateY__out: [0, -20, { start: 0.3, end: 0.35 }],
                messageB__translateY__out: [0, -20, { start: 0.58, end: 0.63 }],
                messageC__translateY__out: [0, -20, { start: 0.85, end: 0.9 }],
                messageA__opacity__out: [1, 0, { start: 0.3, end: 0.35 }],
                messageB__opacity__out: [1, 0, { start: 0.58, end: 0.63 }],
                messageC__opacity__out: [1, 0, { start: 0.85, end: 0.9 }],
                pinB__scaleY: [0.5, 1, { start: 0.5, end: 0.55 }],
                pinC__scaleY: [0.5, 1, { start: 0.72, end: 0.77 }],
                pinB__opacity__in: [0, 1, { start: 0.5, end: 0.55 }],
                pinC__opacity__in: [0, 1, { start: 0.72, end: 0.77 }],
                pinB__opacity__out: [0, 1, { start: 0.58, end: 0.63 }],
                pinC__opacity__out: [0, 1, { start: 0.85, end: 0.9 }],
            }
        },
        {
            // 3
            type: 'sticky',
            heightNum: 5,
            scrollHeight: 0,
            objs: {
                container: document.querySelector('#scroll__section__3'),
                canvasCaption: document.querySelector('.canvas__caption'),
                canvas: document.querySelector('.image__blend__canvas'),
                context: document.querySelector('.image__blend__canvas').getContext('2d'),
                imagesPath: [
                    './images/blend-image-1.jpg',
                    './images/blend-image-2.jpg',
                ],
                images: [],
            },
            values: {

            }
        }
    ];

    function setCanvasImages() {
        let imgElem;
        for (let i = 0; i < sceneInfo[0].values.videoImageCount; i++) {
            imgElem = new Image();
            imgElem.src = `./video/001/IMG_${6726 + i}.JPG`;
            sceneInfo[0].objs.videoImages.push(imgElem);
        }

        let imgElem2;
        for (let i = 0; i < sceneInfo[2].values.videoImageCount; i++) {
            imgElem2 = new Image();
            imgElem2.src = `./video/002/IMG_${7027 + i}.JPG`;
            sceneInfo[2].objs.videoImages.push(imgElem2);
        }

        let imgElem3;
        for (let i = 0; i < sceneInfo[3].objs.imagesPath.length; i++) {
            imgElem3 = new Image();
            imgElem3.src = sceneInfo[3].objs.imagesPath[i];
            sceneInfo[3].objs.images.push(imgElem3);
        }

    }
    setCanvasImages();

    function setLayout() {
        // 각 스크롤 섹션의 높이 세팅
        for (let i = 0; i < sceneInfo.length; i++) {
            if (sceneInfo[i].type === 'sticky') {
                sceneInfo[i].scrollHeight = sceneInfo[i].heightNum * window.innerHeight
            } else if (sceneInfo[i].type === 'normal') {
                sceneInfo[i].scrollHeight = sceneInfo[i].objs.container.offsetHeight;
            }
            sceneInfo[i].objs.container.style.height = `${sceneInfo[i].scrollHeight}px`;
        }

        yOffset = window.pageYOffset;
        let totalScrollHeight = 0;
        for (let i = 0; i < sceneInfo.length; i++) {
            totalScrollHeight += sceneInfo[i].scrollHeight
            if (totalScrollHeight >= yOffset) {
                currentScene = i;
                break;
            }
        }
        document.body.setAttribute('id', `show__scene__${currentScene}`);

        const heightRatio = window.innerHeight / 1080;
        sceneInfo[0].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
        sceneInfo[2].objs.canvas.style.transform = `translate3d(-50%, -50%, 0) scale(${heightRatio})`;
    }

    function calcValues(values, currentYOffset) {
        let rv;
        // 현재 씬(스크롤섹션)에서 스크롤된 범위를 비율로 구하기
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        if (values.length === 3) {
            // start ~ end 사이에 애니메이션 실행
            const partScrollStart = values[2].start * scrollHeight;
            const partScrollEnd = values[2].end * scrollHeight;
            const partScrollHeight = partScrollEnd - partScrollStart;

            if(currentYOffset >= partScrollStart && currentYOffset <= partScrollEnd) {
            rv = (currentYOffset - partScrollStart) / partScrollHeight * (values[1] - values[0]) + values[0];
            } else if(currentYOffset < partScrollStart) {
                rv = values[0];
            } else if(currentYOffset > partScrollEnd) {
                rv = values[1];
            }
        } else {
            rv = scrollRatio * (values[1] - values[0]) + values[0];
        }

        return rv;
    }

    function playAnimation() {
        const objs = sceneInfo[currentScene].objs;
        const values = sceneInfo[currentScene].values;
        const currentYOffset = yOffset - prevScrollHeight;
        const scrollHeight = sceneInfo[currentScene].scrollHeight;
        const scrollRatio = currentYOffset / scrollHeight;

        switch (currentScene) {
            case 0:
                //console.log('0 play');
                let sequence = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence], 0, 0);
                objs.canvas.style.opacity = calcValues(values.canvas__opacity, currentYOffset);

                if (scrollRatio <= 0.22) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA__opacity__in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA__translateY__in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA__opacity__out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA__translateY__out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.42) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB__opacity__in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB__translateY__in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB__opacity__out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB__translateY__out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.62) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC__opacity__in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC__translateY__in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC__opacity__out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC__translateY__out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.82) {
                    // in
                    objs.messageD.style.opacity = calcValues(values.messageD__opacity__in, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD__translateY__in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageD.style.opacity = calcValues(values.messageD__opacity__out, currentYOffset);
                    objs.messageD.style.transform = `translate3d(0, ${calcValues(values.messageD__translateY__out, currentYOffset)}%, 0)`;
                }

                break;

            case 2:
                //console.log('2 play');
                let sequence2 = Math.round(calcValues(values.imageSequence, currentYOffset));
                objs.context.drawImage(objs.videoImages[sequence2], 0, 0);

                if (scrollRatio <= 0.5) {
                    //in
                    objs.canvas.style.opacity = calcValues(values.canvas__opacity__in, currentYOffset);
                } else {
                    //out
                    objs.canvas.style.opacity = calcValues(values.canvas__opacity__out, currentYOffset);
                }

                if (scrollRatio <= 0.32) {
                    // in
                    objs.messageA.style.opacity = calcValues(values.messageA__opacity__in, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA__translateY__in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageA.style.opacity = calcValues(values.messageA__opacity__out, currentYOffset);
                    objs.messageA.style.transform = `translate3d(0, ${calcValues(values.messageA__translateY__out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.67) {
                    // in
                    objs.messageB.style.opacity = calcValues(values.messageB__opacity__in, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB__translateY__in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageB.style.opacity = calcValues(values.messageB__opacity__out, currentYOffset);
                    objs.messageB.style.transform = `translate3d(0, ${calcValues(values.messageB__translateY__out, currentYOffset)}%, 0)`;
                }

                if (scrollRatio <= 0.93) {
                    // in
                    objs.messageC.style.opacity = calcValues(values.messageC__opacity__in, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC__translateY__in, currentYOffset)}%, 0)`;
                } else {
                    // out
                    objs.messageC.style.opacity = calcValues(values.messageC__opacity__out, currentYOffset);
                    objs.messageC.style.transform = `translate3d(0, ${calcValues(values.messageC__translateY__out, currentYOffset)}%, 0)`;
                }

                break;

            case 3:
                //console.log('3 play');
                // 가로 세로 모두 꽉 차게 하기 위해 여기서 세팅(계산 필요)
                const widthRatio = window.innerWidth / objs.canvas.width;
                const heightRatio = window.innerHeight / objs.canvas.height;
                let canvasScaleRatio;

                if (widthRatio <= heightRatio) {
                    // 캔버스보다 브라우저 창이 홀쭉한 경우
                    canvasScaleRatio = heightRatio;
                } else {
                    // 캔버스보다 브라우저 창이 납작한 경우
                    canvasScaleRatio = widthRatio;
                }

                objs.canvas.style.transform = `scale(${canvasScaleRatio})`;
                objs.context.drawImage(objs.images[0], 0, 0);

                break; 
        }
    }


    function scrollLoop() {
        enterNewScene = false;
        prevScrollHeight = 0;
        
        for (let i = 0; i < currentScene; i++) {
            prevScrollHeight += sceneInfo[i].scrollHeight;
        }

        if (yOffset > prevScrollHeight + sceneInfo[currentScene].scrollHeight) {
            enterNewScene = true;
            currentScene++;
            document.body.setAttribute('id', `show__scene__${currentScene}`);
        }

        if (yOffset < prevScrollHeight) {
            enterNewScene = true;
            if (currentScene === 0) return; // 브라우저 바운스 효과로 인해 마이너스가 되는 것을 방지 (모바일)
            currentScene--;
            document.body.setAttribute('id', `show__scene__${currentScene}`);
        }

        if (enterNewScene) return;
        playAnimation();
    }

    window.addEventListener('scroll', () => {
        yOffset = window.pageYOffset;
        scrollLoop();
    });

    //window.addEventListener('DOMContentLoaded', setLayout);
    window.addEventListener('load', () => {
        setLayout();
        sceneInfo[0].objs.context.drawImage(sceneInfo[0].objs.videoImages[0], 0, 0);
    });
    window.addEventListener('resize', setLayout);

})();