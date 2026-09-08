export class InputSystem
{
    constructor (scene, onJump)
    {
        this.scene = scene;
        scene.input.keyboard.on('keydown-SPACE', onJump);
        scene.input.on('pointerdown', onJump);
    }
}