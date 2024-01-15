import Lenis from '@studio-freight/lenis';
import {ScrollTrigger} from "gsap/ScrollTrigger";
import gsap from 'gsap';

const lenis = new Lenis();

lenis.on('scroll', ScrollTrigger.update);

gsap.ticker.add((time)=>{
  lenis.raf(time * 1000);
});

gsap.ticker.lagSmoothing(0);

console.log("Lenis installed.")
