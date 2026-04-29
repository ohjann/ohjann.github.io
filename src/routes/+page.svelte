<script lang="ts">
	let now = $state(new Date());
	let time = $derived(
		now.toLocaleTimeString('en-IE', { hour: '2-digit', minute: '2-digit', hour12: false })
	);

	$effect(() => {
		const id = setInterval(() => (now = new Date()), 10_000);
		return () => clearInterval(id);
	});

	let mounted = $state(false);
	let line2: HTMLElement;

	const canvas = typeof document !== 'undefined' ? document.createElement('canvas') : null;

	function measureText(text: string, fontSize: number): number {
		if (!canvas) return 0;
		const ctx = canvas.getContext('2d')!;
		ctx.font = `700 ${fontSize}px 'Helvetica Neue', Helvetica, Arial, sans-serif`;
		ctx.letterSpacing = `${fontSize * -0.04}px`;
		return ctx.measureText(text).width;
	}

	function fitLine(el: HTMLElement) {
		if (!el) return;
		const container = el.parentElement!.clientWidth;
		const text = el.textContent || '';
		const baseSize = 100;
		const measured = measureText(text, baseSize);
		if (measured > 0) {
			el.style.fontSize = `${(baseSize * container) / measured}px`;
		}
	}

	function fitAll() {
		fitLine(line2);
	}

	$effect(() => {
		mounted = true;
		requestAnimationFrame(fitAll);
		window.addEventListener('resize', fitAll);
		return () => window.removeEventListener('resize', fitAll);
	});

	const items = [
		{ text: 'SOFTWARE ENGINEER', href: undefined },
		{ text: 'DUBLIN, IRELAND', href: undefined },
		{ text: 'GITHUB', href: 'https://github.com/ohjann/' },
		{ text: 'SOUNDCLOUD', href: 'https://soundcloud.com/ohjann' },
		{ text: "LIL' SEQUENCER", href: 'https://eoghan.hyn.es/tonejs-sequencer/' },
		{ text: 'DECISION APP', href: 'https://eoghan.hyn.es/decision-swipe/' },
		{ text: 'AVAILABLE FOR WORK', href: undefined },
		{ text: time, href: undefined }
	];
</script>

<div class="shell" class:mounted>
	<h1 class="name">
		<img class="name-svg" src="/eoghan.svg" alt="Eoghan" />
		<span class="name-line" bind:this={line2}>HYNES</span>
	</h1>

	<div class="ticker">
		<div class="ticker-track">
			<!-- Yarn background layer — one continuous string, no gaps -->
			<div class="ticker-layer yarn">q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5q5yuiowoauy5</div>
			<!-- Text foreground layer -->
			<div class="ticker-layer text">
				{#each { length: 2 } as _}
					{#each items as item}
						{#if item.href}
							<a href={item.href} class="ticker-item" target="_blank" rel="noopener">{item.text}</a>
						{:else}
							<span class="ticker-item">{item.text}</span>
						{/if}
						<span class="ticker-sep">&bull;</span>
					{/each}
				{/each}
			</div>
		</div>
	</div>
</div>

<style>
	.shell {
		height: 100%;
		display: flex;
		flex-direction: column;
		overflow: hidden;
		background: var(--on-surface);
		color: var(--on-primary);
	}

	/* Entrance */
	.name, .ticker {
		opacity: 0;
		transform: translateY(16px);
		transition: opacity 0.5s cubic-bezier(0.16, 1, 0.3, 1),
					transform 0.5s cubic-bezier(0.16, 1, 0.3, 1);
	}
	.mounted .name   { opacity: 1; transform: none; transition-delay: 0s; }
	.mounted .ticker { opacity: 1; transform: none; transition-delay: 0.12s; }

	/* ---- Name Banner ---- */
	.name {
		display: flex;
		flex-direction: column;
		width: 100%;
		overflow: hidden;
		flex: 1;
		justify-content: center;
	}

	.name-svg {
		display: block;
		width: 100%;
		height: auto;
	}

	.name-line {
		display: block;
		font-family: var(--font-display);
		font-weight: 700;
		letter-spacing: -0.04em;
		line-height: 0.88;
		white-space: nowrap;
		width: 100%;
		font-size: 30vw;
	}

	/* ---- Ticker ---- */
	.ticker {
		background: var(--tertiary-container);
		color: white;
		overflow: hidden;
		white-space: nowrap;
		flex-shrink: 0;
		height: 3rem;
	}

	.ticker:hover .ticker-track {
		animation-play-state: paused;
	}

	.ticker-track {
		position: relative;
		height: 100%;
		animation: scroll 25s linear infinite;
		display: inline-block;
	}

	@keyframes scroll {
		0% { transform: translateX(0); }
		100% { transform: translateX(-50%); }
	}

	/* Both layers use identical layout */
	.ticker-layer {
		display: inline-flex;
		align-items: center;
		gap: var(--sp-8);
		white-space: nowrap;
		height: 100%;
	}

	/* Yarn sits behind — fills track width, overflow hidden */
	.ticker-layer.yarn {
		position: absolute;
		top: 0;
		left: 0;
		width: 100%;
		height: 100%;
		display: flex;
		align-items: center;
		font-family: 'Yarndings 12 Charted', serif;
		font-size: 3rem;
		line-height: 1;
		white-space: nowrap;
		pointer-events: none;
		color: white;
		overflow: hidden;
	}

	/* Text sits on top — brand yellow */
	.ticker-layer.text {
		position: relative;
		z-index: 1;
	}

	.ticker-item {
		font-family: var(--font-display);
		font-size: 3rem;
		font-weight: 600;
		letter-spacing: 0.06em;
		white-space: nowrap;
		color: var(--secondary-container);
		text-decoration: none;
		line-height: 1;
	}

	a.ticker-item:hover {
		text-decoration: underline;
	}

	.ticker-sep {
		font-size: 0.5rem;
		color: var(--secondary-container);
	}
</style>
