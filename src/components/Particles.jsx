import Particles, { initParticlesEngine } from "@tsparticles/react";
import { useEffect, useMemo, useState } from "react";
import { loadSlim } from "@tsparticles/slim";

const ParticlesComponent = (props) => {
    const [init, setInit] = useState(false);

    // this should be run only once per application lifetime
    useEffect(() => {
        initParticlesEngine(async (engine) => {
            await loadSlim(engine);
        }).then(() => {
            setInit(true);
        });
    }, []);

    const particlesLoaded = (container) => {
        console.log(container);
    };

    const options = useMemo(
        () => ({
            autoPlay: true,
            background: {
                color: {
                    value: "#000000",
                },
            },
            fullScreen: {
                enable: true,
                zIndex: 0,
            },
            detectRetina: true,
            fpsLimit: 120,
            interactivity: {
                detectsOn: "window",
                events: {
                    onClick: {
                        enable: true,
                        mode: "push",
                    },
                    onHover: {
                        enable: true,
                        mode: "repulse",
                    },
                    resize: {
                        enable: true,
                    },
                },
                modes: {
                    push: {
                        quantity: 4,
                    },
                    repulse: {
                        distance: 200,
                        duration: 0.4,
                    },
                },
            },
            particles: {
                // START OF CHANGES
                collisions: {
                    enable: true, // Enable collisions
                    mode: "bounce", // Particles will bounce off each other
                    overlap: {
                        enable: false, // Disable overlap
                        retries: 0
                    }
                },
                number: {
                    density: {
                        enable: true,
                    },
                    limit: {
                        value: 80 // Set a limit to the number of particles
                    },
                    value: 80,
                },
                // END OF CHANGES
                color: {
                    value: "#ff0000",
                    animation: {
                        h: {
                            enable: true,
                            speed: 20,
                        },
                    },
                },
                links: {
                    color: {
                        value: "#ffffff",
                    },
                    distance: 150,
                    enable: true,
                    opacity: 0.4,
                    width: 1,
                },
                move: {
                    enable: true,
                    speed: 6,
                    direction: "none",
                    outModes: {
                        default: "out",
                    },
                },
                opacity: {
                    value: 0.5,
                },
                shape: {
                    type: "circle",
                },
                size: {
                    value: {
                        min: 1,
                        max: 3,
                    },
                },
            },
        }),
        [],
    );

    if (!init) {
        return <></>;
    }

    return <Particles id={props.id} init={particlesLoaded} options={options} />;
};

export default ParticlesComponent;