<script lang="ts">
	import { onMount } from 'svelte';
	import * as THREE from 'three';
	import { isMobile } from '$stores/app';

	let canvasEl: HTMLCanvasElement;

	onMount(() => {
		const mobile = window.innerWidth < 768;

		// Setup Three.js scene
		const scene = new THREE.Scene();
		const camera = new THREE.PerspectiveCamera(50, window.innerWidth / window.innerHeight, 0.1, 1000);
		camera.position.z = mobile ? 8 : 10;

		const renderer = new THREE.WebGLRenderer({
			canvas: canvasEl,
			alpha: true,
			antialias: !mobile // Disable antialiasing on mobile for performance
		});
		renderer.setSize(window.innerWidth, window.innerHeight);
		renderer.setPixelRatio(Math.min(window.devicePixelRatio, mobile ? 1.5 : 2));

		// Lights
		const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
		scene.add(ambientLight);

		const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
		directionalLight.position.set(10, 10, 5);
		scene.add(directionalLight);

		const pointLight = new THREE.PointLight(0x818cf8, 0.5);
		pointLight.position.set(-10, -10, -5);
		scene.add(pointLight);

		// Create circular particle texture
		const canvas = document.createElement('canvas');
		canvas.width = 64;
		canvas.height = 64;
		const ctx = canvas.getContext('2d');
		if (ctx) {
			const gradient = ctx.createRadialGradient(32, 32, 0, 32, 32, 32);
			gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
			gradient.addColorStop(0.5, 'rgba(255, 255, 255, 0.8)');
			gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
			ctx.fillStyle = gradient;
			ctx.beginPath();
			ctx.arc(32, 32, 32, 0, Math.PI * 2);
			ctx.fill();
		}
		const circleTexture = new THREE.CanvasTexture(canvas);

		// Create particles - fewer on mobile for performance
		const count = mobile ? 60 : 100;
		const spread = mobile ? 18 : 25;
		const positions = new Float32Array(count * 3);
		for (let i = 0; i < count; i++) {
			positions[i * 3] = (Math.random() - 0.5) * spread;
			positions[i * 3 + 1] = (Math.random() - 0.5) * spread;
			positions[i * 3 + 2] = (Math.random() - 0.5) * spread;
		}

		const geometry = new THREE.BufferGeometry();
		geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));

		const material = new THREE.PointsMaterial({
			size: mobile ? 0.15 : 0.12,
			color: 0x6366f1,
			transparent: true,
			opacity: mobile ? 0.8 : 0.7,
			sizeAttenuation: true,
			map: circleTexture,
			alphaMap: circleTexture,
			depthWrite: false
		});

		const points = new THREE.Points(geometry, material);
		scene.add(points);

		// Animation
		let animationId: number;
		const animate = () => {
			animationId = requestAnimationFrame(animate);
			points.rotation.y += 0.0004;
			points.rotation.x += 0.0002;
			renderer.render(scene, camera);
		};
		animate();

		// Handle resize
		const handleResize = () => {
			camera.aspect = window.innerWidth / window.innerHeight;
			camera.updateProjectionMatrix();
			renderer.setSize(window.innerWidth, window.innerHeight);
		};
		window.addEventListener('resize', handleResize);

		return () => {
			cancelAnimationFrame(animationId);
			window.removeEventListener('resize', handleResize);
			geometry.dispose();
			material.dispose();
			circleTexture.dispose();
			renderer.dispose();
		};
	});
</script>

<canvas bind:this={canvasEl} class="w-full h-full"></canvas>
