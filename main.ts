namespace SpriteKind {
    export const BluePortal = SpriteKind.create()
    export const OrangePortalShot = SpriteKind.create()
    export const BluePortalShot = SpriteKind.create()
    export const OrangePortal = SpriteKind.create()
    export const cube = SpriteKind.create()
    export const prop = SpriteKind.create()
    export const portalGun = SpriteKind.create()
    export const laser = SpriteKind.create()
    export const greenCube = SpriteKind.create()
    export const turret = SpriteKind.create()
    export const bullet = SpriteKind.create()
    export const bloodKind = SpriteKind.create()
    export const fire = SpriteKind.create()
    export const talkOne = SpriteKind.create()
    export const talkTwo = SpriteKind.create()
    export const glados = SpriteKind.create()
    export const morality = SpriteKind.create()
    export const rightNero = SpriteKind.create()
    export const bigTurret = SpriteKind.create()
    export const rocket = SpriteKind.create()
    export const intellegence = SpriteKind.create()
    export const anger = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    blockSettings.writeNumber("Time", blockSettings.readNumber("Time") - 30)
    tiles.setTileAt(location, assets.tile`transparency8`)
})
function setInPortal (blue: boolean, value: boolean) {
    if (blue) {
        inBluePortal = value
    } else {
        inOrangePortal = value
    }
}
scene.onHitWall(SpriteKind.Player, function (sprite, location) {
    if (theBluePortal && theOrangePortal) {
        if (sprite.overlapsWith(theBluePortal)) {
            doPortalOverlap(true, sprite)
        }
        if (sprite.overlapsWith(theOrangePortal)) {
            doPortalOverlap(false, sprite)
        }
    }
    if (inBluePortal || inOrangePortal) {
        doPortalUpdate(true)
        doPortalUpdate(false)
        sprite.setFlag(SpriteFlag.GhostThroughWalls, true)
        if (inBluePortal || inOrangePortal) {
            sprite.vx += 0.1
            sprite.vy += 0.1
        }
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`myTile20`)) {
        platformer.setFeatureEnabled(platformer.PlatformerFeatures.WallJumps, true)
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`myTile0`)) {
        if (150 < Math.abs(mySprite.vy) || 150 < Math.abs(mySprite.vx)) {
            tiles.setTileAt(location, assets.tile`transparency8`)
            tiles.setWallAt(location, false)
            if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Left), assets.tile`myTile0`)) {
                tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Left), assets.tile`transparency8`)
                tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Left), false)
            }
            if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Top), assets.tile`myTile0`)) {
                tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Top), assets.tile`transparency8`)
                tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Top), false)
            }
            if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Right), assets.tile`myTile0`)) {
                tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Right), assets.tile`transparency8`)
                tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Right), false)
            }
            if (tiles.tileAtLocationEquals(location.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`myTile0`)) {
                tiles.setTileAt(location.getNeighboringLocation(CollisionDirection.Bottom), assets.tile`transparency8`)
                tiles.setWallAt(location.getNeighboringLocation(CollisionDirection.Bottom), false)
            }
            music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
            scene.cameraShake(4, 500)
            mySprite.startEffect(effects.spray)
            timer.after(200, function () {
                effects.clearParticles(mySprite)
            })
        }
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`myTile38`) && finailBoss && mySprite.tileKindAt(TileDirection.Bottom, assets.tile`myTile38`)) {
        timer.after(300, function () {
            holdingCore = false
        })
    }
})
controller.up.onEvent(ControllerButtonEvent.Pressed, function () {
    music.play(music.melodyPlayable(music.thump), music.PlaybackMode.InBackground)
})
function getInPortal (blue: boolean) {
    if (blue) {
        return inBluePortal
    } else {
        return inOrangePortal
    }
}
function getPortalLocation (blue: boolean) {
    if (getFacingDirection(blue) == 0) {
        return getPortalSprite(blue).tilemapLocation().getNeighboringLocation(CollisionDirection.Left)
    } else if (getFacingDirection(blue) == 1) {
        return getPortalSprite(blue).tilemapLocation().getNeighboringLocation(CollisionDirection.Right)
    } else if (getFacingDirection(blue) == 2) {
        return getPortalSprite(blue).tilemapLocation().getNeighboringLocation(CollisionDirection.Top)
    } else {
        return getPortalSprite(blue).tilemapLocation().getNeighboringLocation(CollisionDirection.Bottom)
    }
}
sprites.onOverlap(SpriteKind.rocket, SpriteKind.glados, function (sprite, otherSprite) {
    scene.cameraShake(4, 500)
    if (phase == 2) {
        story.clearAllText()
        phase = 3
        coreSprite = sprites.create(img`
            c c 6 6 6 6 c c 
            c . . . . . . c 
            . c 1 1 1 1 c . 
            . 1 b b b b 1 . 
            1 1 b 9 9 b 1 1 
            1 1 b 9 9 b 1 1 
            . 1 b b b b 1 . 
            . c 1 1 1 1 c . 
            c . . . . . . c 
            c c 6 6 6 6 c c 
            `, SpriteKind.intellegence)
        coreSprite.setPosition(GLaDOSSprite.x + 50, GLaDOSSprite.y - 40)
        coreSprite.ay = 100
        story.spriteSayText(GLaDOSSprite, "*SCREAMS*", 2, 1, story.TextSpeed.Fast)
        story.spriteSayText(GLaDOSSprite, "The difference between you and me is that I feel pain and remorse", 2, 1, story.TextSpeed.Fast)
    }
    if (phase == 5) {
        coreSprite = sprites.create(img`
            c c 4 4 4 4 c c 
            c . . . . . . c 
            . c 1 1 1 1 c . 
            . 1 b b b b 1 . 
            1 1 b 2 2 b 1 1 
            1 1 b 2 2 b 1 1 
            . 1 b b b b 1 . 
            . c 1 1 1 1 c . 
            c . . . . . . c 
            c c 4 4 4 4 c c 
            `, SpriteKind.anger)
        coreSprite.setPosition(GLaDOSSprite.x - 32, GLaDOSSprite.y + 20)
        animation.runImageAnimation(
        coreSprite,
        [img`
            . d d d d d d d d d d d d d d . 
            d . . . . . . . . . . . . . . d 
            d . . . . . . . . . . . . . . d 
            d . . . c c 4 4 4 4 c c . . . d 
            d . . . c . . . . . . c . . . d 
            d . . . . c 1 1 1 1 c . . . . d 
            d . . . . 1 b b b b 1 . . . . d 
            d . . . 1 1 b 2 2 b 1 1 . . . d 
            d . . . 1 1 b 2 2 b 1 1 . . . d 
            d . . . . 1 b b b b 1 . . . . d 
            d . . . . c 1 1 1 1 c . . . . d 
            d . . . c . . . . . . c . . . d 
            d . . . c c 4 4 4 4 c c . . . d 
            d . . . . . . . . . . . . . . d 
            d . . . . . . . . . . . . . . d 
            . d d d d d d d d d d d d d d . 
            `,img`
            . . . . . . . . . . . . . . . . 
            . . . d d d d d d d d d d d . . 
            . . d . . . . . . . . . . . d . 
            . . d . c c 4 4 4 4 c c . . d . 
            . . d . c . . . . . . c . . d . 
            . . d . . c 1 1 1 1 c . . . d . 
            . . d . . 1 b b b b 1 . . . d . 
            . . d . 1 1 b 2 2 b 1 1 . . d . 
            . . d . 1 1 b 2 2 b 1 1 . . d . 
            . . d . . 1 b b b b 1 . . . d . 
            . . d . . c 1 1 1 1 c . . . d . 
            . . d . c . . . . . . c . . d . 
            . . d . c c 4 4 4 4 c c . . d . 
            . . d . . . . . . . . . . . d . 
            . . . d d d d d d d d d d d . . 
            . . . . . . . . . . . . . . . . 
            `],
        500,
        true
        )
        phase = 6
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile6`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        mecinuims3 = true
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile65`, function (sprite, location) {
    game.setGameOverMessage(false, "Fell into bottomless pit")
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.fire, SpriteKind.anger, function (sprite, otherSprite) {
    sprites.destroy(otherSprite)
    phase = 0
    scene.cameraShake(5, 10000)
    timer.after(10, function () {
        story.spriteSayText(GLaDOSSprite, "Your final time is " + convertToText(blockSettings.readNumber("Time")), 2, 1, story.TextSpeed.Fast)
        color.startFade(color.originalPalette, color.White, 10000)
        timer.after(10000, function () {
            blockSettings.clear()
            game.reset()
        })
    })
})
sprites.onOverlap(SpriteKind.cube, SpriteKind.turret, function (sprite, otherSprite) {
    spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, otherSprite) + randint(-10, 10), randint(-100, -80))
    otherSprite.startEffect(effects.fire)
    otherSprite.startEffect(effects.spray)
    otherSprite.setKind(SpriteKind.Food)
    timer.after(80, function () {
        sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
        timer.after(50, function () {
            sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
            otherSprite.setFlag(SpriteFlag.DestroyOnWall, true)
            music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
            timer.after(100, function () {
                sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
                timer.after(100, function () {
                    sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
                    timer.after(100, function () {
                        sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
                        timer.after(100, function () {
                            sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
                            sprites.destroy(otherSprite)
                        })
                    })
                })
            })
        })
    })
})
controller.B.onEvent(ControllerButtonEvent.Pressed, function () {
    if (portalsEnabled && !(holdingCube)) {
        if (controller.up.isPressed()) {
            projectile = sprites.createProjectileFromSprite(img`
                8 8 
                8 8 
                `, mySprite, 0, -200)
        } else if (controller.down.isPressed()) {
            projectile = sprites.createProjectileFromSprite(img`
                8 8 
                8 8 
                `, mySprite, 0, 200)
        } else if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingLeft)) {
            projectile = sprites.createProjectileFromSprite(img`
                8 8 
                8 8 
                `, mySprite, -200, 0)
        } else {
            projectile = sprites.createProjectileFromSprite(img`
                8 8 
                8 8 
                `, mySprite, 200, 0)
        }
        projectile.setKind(SpriteKind.BluePortalShot)
        multilights.addLightSource(projectile)
    }
    if (level != 21) {
        story.clearAllText()
    }
})
function getPortalSprite (blue: boolean) {
    if (blue) {
        return theBluePortal
    } else {
        return theOrangePortal
    }
}
scene.onOverlapTile(SpriteKind.cube, assets.tile`myTile24`, function (sprite, location) {
    sprites.destroy(sprite)
    fizzleCube()
})
function getPlayerImage () {
    if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingLeft)) {
        return img`
            . . . f f . . . 
            . . f f f f . . 
            . . f f f f . . 
            . . . f f . . . 
            . . . . . . . . 
            . . f f f f . . 
            . . f f f f . . 
            . . f . . f . . 
            `
    } else {
        return img`
            . . . f f . . . 
            . . f f f f . . 
            . . f f f f . . 
            . . . f f . . . 
            . . . . . . . . 
            . . f f f f . . 
            . . f f f f . . 
            . . f . . f . . 
            `
    }
}
function menu () {
    story.showPlayerChoices("Resume", "Volume Up", "Volume Down", "Reset Game")
    if (story.checkLastAnswer("Resume")) {
        blockSettings.remove("Menu")
        game.reset()
    } else if (story.checkLastAnswer("Volume Up")) {
        music.setVolume(blockSettings.readNumber("Volume"))
        blockSettings.writeNumber("Volume", blockSettings.readNumber("Volume") + 25)
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        menu()
    } else if (story.checkLastAnswer("Volume Down")) {
        blockSettings.writeNumber("Volume", blockSettings.readNumber("Volume") - 25)
        music.setVolume(blockSettings.readNumber("Volume"))
        music.play(music.melodyPlayable(music.wawawawaa), music.PlaybackMode.InBackground)
        menu()
    } else {
        blockSettings.clear()
        game.reset()
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.morality, function (sprite, otherSprite) {
    if (controller.down.isPressed()) {
        story.clearAllText()
        holdingCore = true
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.anger, function (sprite, otherSprite) {
    if (controller.down.isPressed()) {
        animation.stopAnimation(animation.AnimationTypes.All, otherSprite)
        otherSprite.setImage(img`
            c c 4 4 4 4 c c 
            c . . . . . . c 
            . c 1 1 1 1 c . 
            . 1 b b b b 1 . 
            1 1 b 2 2 b 1 1 
            1 1 b 2 2 b 1 1 
            . 1 b b b b 1 . 
            . c 1 1 1 1 c . 
            c . . . . . . c 
            c c 4 4 4 4 c c 
            `)
        holdingCore = true
        coreSprite.ay = 100
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile24`, function (sprite, location) {
    fizzle()
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile13`, function (sprite, location) {
    if (19 == level) {
        multilights.toggleLighting(false)
        tiles.setTileAt(location, assets.tile`transparency8`)
        tricked()
    } else {
        music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
        if (1 == level) {
            blockSettings.writeNumber("Level", 2)
            game.reset()
        } else {
            blockSettings.writeNumber("Level", blockSettings.readNumber("Level") + 1)
            game.reset()
        }
    }
})
sprites.onOverlap(SpriteKind.fire, SpriteKind.intellegence, function (sprite, otherSprite) {
    scene.cameraShake(4, 1000)
    sprites.destroy(otherSprite)
    music.stopAllSounds()
    music.play(music.createSong(hex`0096000408040400001c00010a006400f401640000040000000000000000000000000005000004670008000c0001290c001000012214001800012718001c00011d20002400012530003800012438003c0001293c004000012940004400012544004800012448004c0002222554005800011e58005c0001245c006000012a60006400011d64007000011970007400011e07001c00020a006400f4016400000400000000000000000000000000000000030d0028002c000222274c005000012708001c000e050046006603320000040a002d00000064001400013200020100020c001c002000012a78007c00011909010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80058000800090001001400150001002000210001002400250001042c002d0002000a3800390001003c003d0001064400450002000a5000510002000658005900010a5c005d0001006800690002000670007100010a740075000100`), music.PlaybackMode.LoopingInBackground)
    phase = 4
    story.spriteSayText(GLaDOSSprite, "*SCREAMS*", 2, 1, story.TextSpeed.Fast)
    story.spriteSayText(GLaDOSSprite, "You think you're doing some damage? 2+2=...*Static*", 2, 1)
    story.spriteSayText(GLaDOSSprite, "10!", 2, 1)
    story.spriteSayText(GLaDOSSprite, "In base four I'm fine!", 2, 1)
    phase = 5
})
controller.A.onEvent(ControllerButtonEvent.Pressed, function () {
    if (portalsEnabled && !(holdingCube)) {
        if (controller.up.isPressed()) {
            projectile = sprites.createProjectileFromSprite(img`
                4 4 
                4 4 
                `, mySprite, 0, -200)
        } else if (controller.down.isPressed()) {
            projectile = sprites.createProjectileFromSprite(img`
                4 4 
                4 4 
                `, mySprite, 0, 200)
        } else if (platformer.hasState(mySprite, platformer.PlatformerSpriteState.FacingLeft)) {
            projectile = sprites.createProjectileFromSprite(img`
                4 4 
                4 4 
                `, mySprite, -200, 0)
        } else {
            projectile = sprites.createProjectileFromSprite(img`
                4 4 
                4 4 
                `, mySprite, 200, 0)
        }
        projectile.setKind(SpriteKind.OrangePortalShot)
        multilights.addLightSource(projectile)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile7`, function (sprite, location) {
    if (controller.down.isPressed()) {
        sprite.vy = 35
    } else {
        sprite.vy = -35
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.portalGun, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.powerUp), music.PlaybackMode.InBackground)
    sprites.destroy(otherSprite)
    notYourPortalGun = false
    portalsEnabled = true
    story.printText("Congratulations", 75, 10, 9, 1, story.TextSpeed.Normal)
    story.printText("With your portal gun you are now in control of both of the portals", 75, 10, 9, 1, story.TextSpeed.Normal)
    story.printText("Press A and B to fire their respective portals", 75, 10, 9, 1, story.TextSpeed.Normal)
    story.printText("You can not fire portals if you are holding a cube", 75, 10, 9, 1, story.TextSpeed.Normal)
})
scene.onOverlapTile(SpriteKind.OrangePortalShot, assets.tile`myTile24`, function (sprite, location) {
    sprites.destroy(sprite)
})
spriteutils.createRenderable(10, function (screen2) {
    drawFakePlayer(true, screen2)
    drawFakePlayer(false, screen2)
    if (getInPortal(false) || getInPortal(true)) {
        spriteutils.drawTransparentImage(tiles.tileImageAtLocation(getPortalLocation(true)), screen2, getPortalLocation(true).left - scene.cameraProperty(CameraProperty.Left), getPortalLocation(true).top - scene.cameraProperty(CameraProperty.Top))
        spriteutils.drawTransparentImage(tiles.tileImageAtLocation(getPortalLocation(false)), screen2, getPortalLocation(false).left - scene.cameraProperty(CameraProperty.Left), getPortalLocation(false).top - scene.cameraProperty(CameraProperty.Top))
    }
})
sprites.onOverlap(SpriteKind.cube, SpriteKind.fire, function (sprite, otherSprite) {
    mySprite.sayText("Fratricide", 500, true)
    sprite.startEffect(effects.hearts)
    tiles.setTileAt(tiles.getTileLocation(2, 9), assets.tile`myTile10`)
    tiles.setWallAt(tiles.getTileLocation(2, 9), false)
    sprite.setKind(SpriteKind.prop)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.turret, function (sprite, otherSprite) {
    spriteutils.setVelocityAtAngle(otherSprite, spriteutils.angleFrom(sprite, otherSprite) + randint(-10, 10), randint(-100, -80))
    otherSprite.startEffect(effects.fire)
    otherSprite.startEffect(effects.spray)
    otherSprite.setKind(SpriteKind.Food)
    music.play(music.melodyPlayable(music.buzzer), music.PlaybackMode.InBackground)
    timer.after(80, function () {
        sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
        timer.after(50, function () {
            sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
            otherSprite.setFlag(SpriteFlag.DestroyOnWall, true)
            music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
            timer.after(100, function () {
                sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
                timer.after(100, function () {
                    sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
                    timer.after(100, function () {
                        sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
                        timer.after(100, function () {
                            sprites.destroyAllSpritesOfKind(SpriteKind.bullet)
                            sprites.destroy(otherSprite)
                        })
                    })
                })
            })
        })
    })
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile25`, function (sprite, location) {
    if (controller.down.isPressed()) {
        music.play(music.melodyPlayable(music.magicWand), music.PlaybackMode.InBackground)
        tiles.setTileAt(location, assets.tile`myTile26`)
        timer.after(1000, function () {
            tiles.setTileAt(location, assets.tile`myTile27`)
            timer.after(1000, function () {
                tiles.setTileAt(location, assets.tile`myTile25`)
                holdingCube = false
                sprites.destroyAllSpritesOfKind(SpriteKind.cube, effects.spray, 1000)
                fizzleCube()
            })
        })
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.greenCube, function (sprite, otherSprite) {
    if (controller.down.isPressed() && !(holdingCube)) {
        sprites.destroy(otherSprite)
        timer.after(100, function () {
            holdingGreen = true
        })
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile3`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        mecnisum1 = true
    }
})
scene.onOverlapTile(SpriteKind.cube, assets.tile`myTile6`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        mecinuims3 = true
    }
})
scene.onOverlapTile(SpriteKind.OrangePortalShot, assets.tile`myTile23`, function (sprite, location) {
    sprites.destroy(sprite)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.fire, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "Wouldn't kill your companion")
    game.gameOver(false)
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.intellegence, function (sprite, otherSprite) {
    if (controller.down.isPressed()) {
        holdingCore = true
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.rocket, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "Obliterated by rocket")
    game.gameOver(false)
})
info.onCountdownEnd(function () {
    if (level == 1) {
        projectile = sprites.create(img`
            9 9 
            9 9 
            `, SpriteKind.BluePortalShot)
        tiles.placeOnTile(projectile, tiles.getTileLocation(1, 13))
        projectile.vx = -200
        projectile = sprites.create(img`
            4 4 
            4 4 
            `, SpriteKind.OrangePortalShot)
        tiles.placeOnTile(projectile, tiles.getTileLocation(6, 13))
        projectile.vy = -200
        timer.after(2000, function () {
            summonCube(8, 11)
            timer.after(10000, function () {
                story.printText("Press down to pick up and dispense the cube onto the super-collider button", 75, 30, 9, 1, story.TextSpeed.Normal)
            })
        })
    } else {
        game.setGameOverMessage(false, "Deadly Nerotoxin")
        game.gameOver(false)
    }
})
scene.onOverlapTile(SpriteKind.BluePortalShot, assets.tile`myTile24`, function (sprite, location) {
    sprites.destroy(sprite)
})
function loadLevel (num: number) {
    if (num == 1) {
        info.startCountdown(50)
        timer.after(10000, function () {
            story.printText("Hello, and again welcome to the Aperture Science Computer-Aided Enrichment CenterTM", 75, 30, 9, 1, story.TextSpeed.Normal)
            story.printText("We hope your brief detention in the relaxation vault has been a pleasant one.", 75, 30, 9, 1, story.TextSpeed.Normal)
            story.printText("Your Specimen has been processed and we are ready to commence testing.", 75, 30, 9, 1, story.TextSpeed.Normal)
            story.printText("But before we start however, ", 75, 20, 9, 1, story.TextSpeed.Normal)
            story.printText("keep in mind that all the fun and learning are the primary goals of testing.", 75, 30, 9, 1, story.TextSpeed.Normal)
        })
    }
    if (num == 2) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber0`))
        level = 2
        portalsEnabled = false
        holdingCube = false
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 9))
        portalGunSprite = sprites.create(assets.image`myImage`, SpriteKind.portalGun)
        tiles.placeOnTile(portalGunSprite, tiles.getTileLocation(8, 13))
        gunFacingDirection = 0
        notYourPortalGun = true
        story.printText("Excellent", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("Be careful not to be burned alive by the deadly lasers.", 75, 30, 9, 1, story.TextSpeed.Normal)
        projectile = sprites.create(img`
            9 9 
            9 9 
            `, SpriteKind.BluePortalShot)
        tiles.placeOnTile(projectile, tiles.getTileLocation(3, 9))
        projectile.vx = 200
        summonCube(2, 11)
    }
    if (num == 3) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber1`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
        level = 3
        story.printText("You are doing quite well", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("The portals are proven to be safe but the device is not", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("Do not look directly into the operational end of the device when firing", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("Do not submerge the device into water--even partaily", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("And Most importantly, under no circumstances should you ever *static*", 75, 30, 9, 1, story.TextSpeed.Normal)
        tiles.setTileAt(tiles.getTileLocation(4, 13), assets.tile`myTile10`)
        tiles.setWallAt(tiles.getTileLocation(4, 13), false)
        summonCube(15, 8)
        portalsEnabled = true
    }
    if (num == 4) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber4`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
        level = 4
        story.printText("Do you know how portals affect momentum?", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("Or to be more precise how they do not.", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("Momentum, a function of mass and velocity is conserved between portals.", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("In layman's terms: speedy thing go in, speedy thing come out", 75, 30, 9, 1, story.TextSpeed.Normal)
        tiles.setTileAt(tiles.getTileLocation(4, 13), assets.tile`myTile10`)
        tiles.setWallAt(tiles.getTileLocation(4, 13), false)
        portalsEnabled = true
    }
    if (num == 5) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber5`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
        level = 5
        story.printText("Fun Fact:", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("That Device you are carrying is worth more than all the organs of all the residents in [subject name]'s [subject's hometown]", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("Believe me, we have looked into it", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("Fun Fact:", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("You can wall jump on pink slime", 75, 30, 9, 1, story.TextSpeed.Normal)
        portalsEnabled = true
        tiles.setTileAt(tiles.getTileLocation(3, 13), assets.tile`myTile10`)
        tiles.setWallAt(tiles.getTileLocation(3, 13), false)
        summonCube(8, 7)
        summonGreenCube(9, 1)
    }
    if (num == 6) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber6`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
        story.printText("Note the incandescent particle field midway through the chamber", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("This Aperture Science Emancipation Grill will vaporize the following", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("eye-photoreceptors, Reptiles, Teeth enamel, Earlobes, portal bullets, solid radium, non-Aperture brand shoes, weighted storage cubes and other-dimensional threats.", 75, 30, 9, 1, story.TextSpeed.VeryFast)
        story.printText("Note: certain items on the list only appear in semi-rare cases", 75, 30, 9, 1, story.TextSpeed.Normal)
        level = 6
        portalsEnabled = true
        tiles.setTileAt(tiles.getTileLocation(4, 13), assets.tile`myTile10`)
        tiles.setWallAt(tiles.getTileLocation(4, 13), false)
        summonCube(2, 11)
    }
    if (num == 7) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber7`))
        level = 7
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 2))
        story.printText("Aperture Science's Innovators have also developed \"Emancipation Buttons\"", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("Press \"Down\" to activate while overlapping", 75, 30, 9, 1, story.TextSpeed.Normal)
        portalsEnabled = true
        tiles.setTileAt(tiles.getTileLocation(3, 2), assets.tile`myTile10`)
        tiles.setWallAt(tiles.getTileLocation(3, 2), false)
        summonCube(11, 11)
    }
    if (num == 8) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber8`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 4))
        story.printText("Did you you know that you can donate one or all of your vital organs to the Aperture Science self-esteem fund for girls... It's true", 75, 30, 9, 1, story.TextSpeed.Normal)
        tiles.setTileAt(tiles.getTileLocation(3, 4), assets.tile`myTile10`)
        tiles.setWallAt(tiles.getTileLocation(3, 4), false)
        portalsEnabled = true
        level = 8
        summonCube(2, 8)
    }
    if (num == 9) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber9`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 4))
        portalsEnabled = true
        level = 9
        summonCube(12, 1)
        timer.after(12000, function () {
            invalidTest()
        })
    }
    if (num == 10) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber10`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
        level = 10
        turrets()
        story.printText("The obstacles are military turrets.", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("These objects look like pale spherical things that are full of bullets.", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText(" Wait nevermind that's you in a few seconds.", 75, 30, 9, 1, story.TextSpeed.Normal)
        turretsActive = true
        portalsEnabled = true
        tiles.setTileAt(tiles.getTileLocation(1, 13), assets.tile`myTile25`)
        tiles.setTileAt(tiles.getTileLocation(3, 13), assets.tile`myTile10`)
        tiles.setWallAt(tiles.getTileLocation(3, 13), false)
        summonCube(12, 10)
    }
    if (num == 11) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber11`))
        turrets()
        tiles.placeOnTile(mySprite, tiles.getTileLocation(17, 12))
        story.printText("Portals generate a lot of energy", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("This energy is used to power things in similar ways to the super-collider button", 75, 30, 9, 1, story.TextSpeed.Normal)
        tiles.setTileAt(tiles.getTileLocation(15, 13), assets.tile`myTile10`)
        tiles.setWallAt(tiles.getTileLocation(15, 13), false)
        level = 11
        portalsEnabled = true
        turretsActive = true
    }
    if (num == 12) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber12`))
        portalsEnabled = true
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
        level = 12
        story.printText("You are nearing the final test chamber", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("After completing the testing track you will be bathed and there will be cake", 75, 30, 9, 1, story.TextSpeed.Normal)
        tiles.setTileAt(tiles.getTileLocation(4, 13), assets.tile`myTile10`)
        tiles.setWallAt(tiles.getTileLocation(4, 13), false)
        summonCube(10, 1)
    }
    if (num == 13) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber13`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 10))
        story.printText("Rescue the weighted storage cube", 75, 30, 9, 1, story.TextSpeed.Normal)
        portalsEnabled = true
        level = 13
    }
    if (num == 14) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber14`))
        level = 14
        for (let value of tiles.getTilesByType(assets.tile`myTile39`)) {
            cutsceneSprite = sprites.create(img`
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                `, SpriteKind.talkOne)
            cutsceneSprite.setFlag(SpriteFlag.Invisible, true)
            tiles.placeOnTile(cutsceneSprite, value)
            tiles.setTileAt(value, assets.tile`transparency8`)
        }
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 3))
        fireSprite = sprites.create(img`
            . . . . 3 3 . . 
            . . . 3 3 3 3 . 
            . . . 3 4 4 3 . 
            . . 3 3 4 4 3 3 
            . . 3 4 5 5 4 3 
            . 3 4 5 5 5 4 3 
            . 3 4 5 2 5 4 3 
            3 3 4 5 2 5 4 3 
            `, SpriteKind.fire)
        tiles.placeOnTile(fireSprite, tiles.getTileLocation(6, 12))
        fireSprite.startEffect(effects.fire)
        animation.runImageAnimation(
        fireSprite,
        [img`
            . . . . 3 3 . . 
            . . . 3 3 3 3 . 
            . . . 3 4 4 3 . 
            . . 3 3 4 4 3 3 
            . . 3 4 5 5 4 3 
            . 3 4 5 5 5 4 3 
            . 3 4 5 2 5 4 3 
            3 3 4 5 2 5 4 3 
            `,img`
            . . . . . . . . 
            . . 3 3 . . . . 
            . 3 3 3 3 . . . 
            . 3 4 4 3 . . . 
            3 3 4 4 3 3 . . 
            3 4 5 5 4 3 3 . 
            3 4 5 5 5 4 3 . 
            3 4 5 2 5 4 3 3 
            `,img`
            . . 3 3 . . . . 
            . 3 3 3 3 . . . 
            . 3 4 4 3 . . . 
            3 3 4 4 3 3 . . 
            3 4 5 5 4 3 . . 
            3 4 5 5 5 4 3 . 
            3 4 5 2 5 4 3 . 
            3 4 5 2 5 4 3 3 
            `,img`
            . . . . . . . . 
            . . . . 3 3 . . 
            . . . 3 3 3 3 . 
            . . . 3 4 4 3 . 
            . . 3 3 4 4 3 3 
            . 3 3 4 5 5 4 3 
            . 3 4 5 5 5 4 3 
            3 3 4 5 2 5 4 3 
            `],
        500,
        true
        )
        fireSprite = sprites.create(img`
            . . . . 3 3 . . 
            . . . 3 3 3 3 . 
            . . . 3 4 4 3 . 
            . . 3 3 4 4 3 3 
            . . 3 4 5 5 4 3 
            . 3 4 5 5 5 4 3 
            . 3 4 5 2 5 4 3 
            3 3 4 5 2 5 4 3 
            `, SpriteKind.fire)
        tiles.placeOnTile(fireSprite, tiles.getTileLocation(7, 12))
        fireSprite.startEffect(effects.fire)
        animation.runImageAnimation(
        fireSprite,
        [img`
            . . . . 3 3 . . 
            . . . 3 3 3 3 . 
            . . . 3 4 4 3 . 
            . . 3 3 4 4 3 3 
            . . 3 4 5 5 4 3 
            . 3 4 5 5 5 4 3 
            . 3 4 5 2 5 4 3 
            3 3 4 5 2 5 4 3 
            `,img`
            . . . . . . . . 
            . . 3 3 . . . . 
            . 3 3 3 3 . . . 
            . 3 4 4 3 . . . 
            3 3 4 4 3 3 . . 
            3 4 5 5 4 3 3 . 
            3 4 5 5 5 4 3 . 
            3 4 5 2 5 4 3 3 
            `,img`
            . . 3 3 . . . . 
            . 3 3 3 3 . . . 
            . 3 4 4 3 . . . 
            3 3 4 4 3 3 . . 
            3 4 5 5 4 3 . . 
            3 4 5 5 5 4 3 . 
            3 4 5 2 5 4 3 . 
            3 4 5 2 5 4 3 3 
            `,img`
            . . . . . . . . 
            . . . . 3 3 . . 
            . . . 3 3 3 3 . 
            . . . 3 4 4 3 . 
            . . 3 3 4 4 3 3 
            . 3 3 4 5 5 4 3 
            . 3 4 5 5 5 4 3 
            3 3 4 5 2 5 4 3 
            `],
        500,
        true
        )
        fireSprite = sprites.create(img`
            . . . . 3 3 . . 
            . . . 3 3 3 3 . 
            . . . 3 4 4 3 . 
            . . 3 3 4 4 3 3 
            . . 3 4 5 5 4 3 
            . 3 4 5 5 5 4 3 
            . 3 4 5 2 5 4 3 
            3 3 4 5 2 5 4 3 
            `, SpriteKind.fire)
        tiles.placeOnTile(fireSprite, tiles.getTileLocation(8, 12))
        fireSprite.startEffect(effects.fire)
        animation.runImageAnimation(
        fireSprite,
        [img`
            . . . . 3 3 . . 
            . . . 3 3 3 3 . 
            . . . 3 4 4 3 . 
            . . 3 3 4 4 3 3 
            . . 3 4 5 5 4 3 
            . 3 4 5 5 5 4 3 
            . 3 4 5 2 5 4 3 
            3 3 4 5 2 5 4 3 
            `,img`
            . . . . . . . . 
            . . 3 3 . . . . 
            . 3 3 3 3 . . . 
            . 3 4 4 3 . . . 
            3 3 4 4 3 3 . . 
            3 4 5 5 4 3 3 . 
            3 4 5 5 5 4 3 . 
            3 4 5 2 5 4 3 3 
            `,img`
            . . 3 3 . . . . 
            . 3 3 3 3 . . . 
            . 3 4 4 3 . . . 
            3 3 4 4 3 3 . . 
            3 4 5 5 4 3 . . 
            3 4 5 5 5 4 3 . 
            3 4 5 2 5 4 3 . 
            3 4 5 2 5 4 3 3 
            `,img`
            . . . . . . . . 
            . . . . 3 3 . . 
            . . . 3 3 3 3 . 
            . . . 3 4 4 3 . 
            . . 3 3 4 4 3 3 
            . 3 3 4 5 5 4 3 
            . 3 4 5 5 5 4 3 
            3 3 4 5 2 5 4 3 
            `],
        500,
        true
        )
        timer.after(100, function () {
            story.printText("Here is your friend you saved from the previous chamber.", 75, 30, 9, 1, story.TextSpeed.Normal)
            summonCube(2, 1)
            timer.after(1000, function () {
                story.printText("Your friend is a companion cube.", 75, 30, 9, 1, story.TextSpeed.Normal)
                story.printText("The companion cube will accompany you through the finial chamber.", 75, 30, 9, 1, story.TextSpeed.Normal)
                story.printText("Please take care of it.", 75, 30, 9, 1, story.TextSpeed.Normal)
                tiles.setTileAt(tiles.getTileLocation(4, 3), assets.tile`myTile10`)
                tiles.setWallAt(tiles.getTileLocation(4, 3), false)
                portalsEnabled = true
            })
        })
    }
    if (num == 15) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`TestChamber15`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 5))
        story.printText("Congratulations, you have completed testing", 75, 90, 9, 1, story.TextSpeed.Normal)
        story.printText("Your contributions to science are immeasurable ", 75, 90, 9, 1, story.TextSpeed.Normal)
        story.printText("We want to celebrate that, we will have a party", 75, 90, 9, 1, story.TextSpeed.Normal)
        story.printText("If you assume the party-collection-position", 75, 90, 9, 1, story.TextSpeed.Normal)
        story.printText("We will dispatch a party associate to take you to your party", 75, 90, 9, 1, story.TextSpeed.Normal)
        story.printText("Lay down flat and stare at the celling to assume the party-collection-position.", 75, 90, 9, 1, story.TextSpeed.Normal)
        portalsEnabled = true
        laserSprite = sprites.create(img`
            c......................................c
            bc....................................cb
            bbc..................................cbb
            2bc2222222222222222222222222222222222cb2
            2bc2222222222222222222222222222222222cb2
            bbc..................................cbb
            bc....................................cb
            c......................................c
            `, SpriteKind.laser)
        laserSprite.setFlag(SpriteFlag.GhostThroughWalls, true)
        laserSprite.ay = -1.5
        tiles.placeOnTile(laserSprite, tiles.getTileLocation(3, 13))
        timer.after(9000, function () {
            story.printText("Wait, no! You can't do that!", 75, 90, 9, 1, story.TextSpeed.VeryFast)
        })
        timer.after(10000, function () {
            story.printText("You have passed the finial test", 75, 90, 9, 1, story.TextSpeed.Normal)
            story.printText("Sorry we had to trick you", 75, 90, 9, 1, story.TextSpeed.Normal)
            story.printText("Please return to the chamber", 75, 90, 9, 1, story.TextSpeed.Normal)
            tiles.setTileAt(tiles.getTileLocation(2, 3), assets.tile`myTile14`)
            tiles.setTileAt(tiles.getTileLocation(4, 3), assets.tile`myTile14`)
        })
    }
    if (num == 16) {
        multilights.toggleLighting(true)
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level32`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
        portalsEnabled = true
    }
    if (num == 17) {
        multilights.toggleLighting(true)
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level34`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 11))
        portalsEnabled = true
    }
    if (num == 18) {
        multilights.toggleLighting(true)
        portalsEnabled = true
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level38`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 13))
    }
    if (num == 19) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`inside`))
        multilights.toggleLighting(true)
        propSprite = sprites.create(img`
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            1 9 9 9 b 9 b b 9 b 9 b 9 9 9 1 
            1 9 b b b b 9 9 b b b b b 9 b 1 
            1 9 9 b b b 9 9 b b 9 b b 9 b 1 
            1 9 b b b b 9 9 b b 9 b b 9 b 1 
            1 9 b b b b 9 9 b b 9 b b 9 b 1 
            1 9 9 9 b 9 b b 9 b 9 b b 9 b 1 
            1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 1 
            `, SpriteKind.prop)
        tiles.placeOnTile(propSprite, tiles.getTileLocation(2, 10))
        multilights.addLightSource(propSprite, 6)
        level = 19
    }
    if (num == 20) {
        multilights.toggleLighting(true)
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level42`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(0, 13))
        for (let value of tiles.getTilesByType(assets.tile`myTile39`)) {
            cutsceneSprite = sprites.create(img`
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                3 3 3 3 3 3 3 3 
                `, SpriteKind.talkTwo)
            cutsceneSprite.setFlag(SpriteFlag.Invisible, true)
            tiles.placeOnTile(cutsceneSprite, value)
            tiles.setTileAt(value, assets.tile`transparency8`)
        }
        turrets()
    }
    if (num == 21) {
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level44`))
        tiles.placeOnTile(mySprite, tiles.getTileLocation(1, 13))
        level = 21
        GLaDOSSprite = sprites.create(img`
            bffbbbbbbcccbbbb5fbbf.............................
            fbbfccbfcbbbccbbfcccbf............................
            ccbbfcfbbcccbbcbffcff.............................
            fccffcfbb2bbcbcfbbfc55............................
            fff5cfcfbbbbbcbccbbfbb............................
            fc55cfffb2b3bcbfccbbffb...........................
            cc55fffccfcbbbcbfcffccffb.........................
            ccffbbfcc3c2bbffffffbbccfb........................
            cfccbbfffcccffcbfcbbbffffff.......................
            cffccbffbffffcccfcbffbfbbbbf......................
            ccfcff5bbbffbfcfcbfccfbfbbfbf.....................
            fccfc555bfccbbffccfcffbbbbbbf.....................
            .fcccc555ffcccbbfcbfecfb2bbbbf....................
            .fcccccfffbffcccfcbffcfbbbfbff....................
            ..fcccfccb9bbfffffccfcfffb2b3f....................
            ...fcccffcbbbfcf11ffffffbbbbbff..ffffffff.........
            ....fffccfccfcf11f11fcbbfffffccff111111f1f........
            ....ff1ffcffcff11111fccbfcccffcfbf111111f1f.......
            ....fb111fffffb11111fcccffff11ffbf1f111111f.......
            ....fbf11111fb11111fcccfbf11ff1fbf1111ffffff......
            .....fbb1111fb11f11fcffbf1ffcffcffffff11111f......
            .....fbbf1f1fbff11ffbbfbf1ffcfccfbf11111111f......
            .....fffb111ffbbbffcbbbf1fccffcbfbf111111111f.....
            ......fbffff11fffbfccbbf1fcffccfffbf11ffff11f.....
            ......fbb111111bbbfccccbfbfcfcbfcfbf11fccf11f.....
            .......fbbbbb111bbbfffccfbfffcfccfbf11ffff11f.....
            ........fffbbbbbbffff.ffffbbfbfcffbf11fcff11f.....
            ...........ffffff.........fffcfcffbf11ff5f11f.....
            ............................fcbfcfbf11f55f11f.....
            .............................fcfffbf11fccf11f.....
            .............................ffcfbf11ffff111f.....
            ...............................cfbf11fccf11f......
            ...............................fbfb11ffff11f......
            ...............................fbfb1111111f.......
            ...............................fbfbb111ffbf.......
            ................................fbbbbbbfbf........
            .................................ffffffff.........
            ..................................................
            ..................................................
            ..................................................
            ..................................................
            ..................................................
            ..................................................
            ..................................................
            ..................................................
            ..................................................
            ..................................................
            ..................................................
            ..................................................
            ..................................................
            `, SpriteKind.glados)
        GLaDOSSprite.setFlag(SpriteFlag.ShowPhysics, false)
        tiles.placeOnTile(GLaDOSSprite, tiles.getTileLocation(11, 6))
        GLaDOSSprite.y += 5
        GlaDos()
        finailBoss = true
    }
}
function summonGreenCube (col: number, row: number) {
    greenCube = sprites.create(img`
        f f f f f f f f 
        f b 1 b b 1 b f 
        f 1 d d d d 1 f 
        f b d a a d b f 
        f b d a a d b f 
        f 1 d d d d 1 f 
        f b 1 b b 1 b f 
        f f f f f f f f 
        `, SpriteKind.greenCube)
    greenCube.z = -5
    greenCube.ay = 200
    tiles.placeOnTile(greenCube, tiles.getTileLocation(col, row))
}
scene.onOverlapTile(SpriteKind.BluePortalShot, assets.tile`myTile23`, function (sprite, location) {
    sprites.destroy(sprite)
})
function getFacingDirection (blue: boolean) {
    if (blue) {
        return bluePortalFacing
    } else {
        return orangePortalFacing
    }
}
scene.onHitWall(SpriteKind.BluePortalShot, function (sprite, location) {
    sprite.destroy()
    if (!(inBluePortal || inOrangePortal) && tiles.tileAtLocationEquals(location, assets.tile`myTile`)) {
        music.play(music.tonePlayable(randint(131, 237), music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        if (theBluePortal) {
            theBluePortal.destroy()
        }
        if (sprite.vx < 0) {
            theBluePortal = sprites.create(img`
                8 9 . . . . . . 
                8 9 . . . . . . 
                8 9 . . . . . . 
                8 9 . . . . . . 
                8 9 . . . . . . 
                8 9 . . . . . . 
                8 9 . . . . . . 
                8 9 . . . . . . 
                `, SpriteKind.BluePortal)
            tiles.placeOnTile(theBluePortal, location.getNeighboringLocation(CollisionDirection.Right))
            bluePortalFacing = 0
        } else if (sprite.vx > 0) {
            theBluePortal = sprites.create(img`
                . . . . . . 9 8 
                . . . . . . 9 8 
                . . . . . . 9 8 
                . . . . . . 9 8 
                . . . . . . 9 8 
                . . . . . . 9 8 
                . . . . . . 9 8 
                . . . . . . 9 8 
                `, SpriteKind.BluePortal)
            tiles.placeOnTile(theBluePortal, location.getNeighboringLocation(CollisionDirection.Left))
            bluePortalFacing = 1
        } else if (sprite.vy < 0) {
            theBluePortal = sprites.create(img`
                8 8 8 8 8 8 8 8 
                9 9 9 9 9 9 9 9 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                `, SpriteKind.BluePortal)
            tiles.placeOnTile(theBluePortal, location.getNeighboringLocation(CollisionDirection.Bottom))
            bluePortalFacing = 2
        } else {
            theBluePortal = sprites.create(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                9 9 9 9 9 9 9 9 
                8 8 8 8 8 8 8 8 
                `, SpriteKind.BluePortal)
            tiles.placeOnTile(theBluePortal, location.getNeighboringLocation(CollisionDirection.Top))
            bluePortalFacing = 3
        }
        blueFizzled = false
        multilights.addLightSource(theBluePortal, 5)
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`myTile31`)) {
        music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
        tiles.setTileAt(location, assets.tile`myTile34`)
    } else {
        if (tiles.tileAtLocationEquals(location, assets.tile`myTile34`)) {
            music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
            tiles.setTileAt(location, assets.tile`myTile31`)
        }
    }
})
scene.onOverlapTile(SpriteKind.cube, assets.tile`myTile5`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        mecnisum2 = true
    }
})
function turrets () {
    for (let value of tiles.getTilesByType(assets.tile`myTile28`)) {
        turretSprite = sprites.create(img`
            . . . f f f . . 
            . . f 1 b 1 f . 
            . f 1 b 1 1 1 f 
            . f 1 2 1 1 1 f 
            . f 1 b 1 1 1 f 
            . . f b 1 1 1 f 
            . f c 1 b 1 f . 
            f c c c f f c f 
            f c c f . f c f 
            f c f . . . f . 
            `, SpriteKind.turret)
        sightRangeSprite = sight.createSectorAlertRange(
        turretSprite,
        0,
        180,
        80
        )
        tiles.placeOnTile(turretSprite, value)
        tiles.setTileAt(value, assets.tile`transparency8`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile29`)) {
        turretTwo = sprites.create(img`
            . . f f f . . . 
            . f 1 b 1 f . . 
            f 1 1 1 b 1 f . 
            f 1 1 1 2 1 f . 
            f 1 1 1 b 1 f . 
            f 1 1 1 b f . . 
            . f 1 b 1 c f . 
            f c f f c c c f 
            f c f . f c c f 
            . f . . . f c f 
            `, SpriteKind.turret)
        sightRangeSprite = sight.createSectorAlertRange(
        turretTwo,
        0,
        0,
        100
        )
        tiles.placeOnTile(turretTwo, value)
        tiles.setTileAt(value, assets.tile`transparency8`)
    }
    spriteutils.setLifeImage(img`
        f f f f f f f f 
        f b 1 b b 1 b f 
        f 1 e 1 1 e 1 f 
        f e e e e e e f 
        f e e e e e e f 
        f 1 e e e e 1 f 
        f b 1 e e 1 b f 
        f f f f f f f f 
        `)
    info.setLife(3)
}
scene.onOverlapTile(SpriteKind.greenCube, assets.tile`myTile3`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        mecnisum1 = true
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.BluePortal, function (sprite, otherSprite) {
    if (!(blueFizzled || orangeFizzled)) {
        doPortalOverlap(true, sprite)
    }
})
function rotateImage (image2: Image) {
    tempImage = image.create(8, 8)
    for (let x = 0; x <= 7; x++) {
        for (let y = 0; y <= 7; y++) {
            tempImage.setPixel(x, y, image2.getPixel(7 - y, x))
        }
    }
    return tempImage
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile17`, function (sprite, location) {
    if (level == 5) {
        game.gameOver(false)
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile36`, function (sprite, location) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    blockSettings.writeNumber("Level", blockSettings.readNumber("Level") + 1)
    game.reset()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.laser, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "Fried by a laser")
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile66`, function (sprite, location) {
    blockSettings.writeNumber("Time", blockSettings.readNumber("Time") - 30)
    tiles.setTileAt(location, assets.tile`myTile45`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile44`, function (sprite, location) {
    sprite.vy = -5
    if (controller.up.isPressed()) {
        sprite.vy = -90
    } else {
        if (controller.down.isPressed()) {
            sprite.vy = 90
        }
    }
})
function doPortalOverlap (blue: boolean, sprite: Sprite) {
    if (theBluePortal && theOrangePortal && !(blueFizzled || orangeFizzled)) {
        if (bluePortalFacing == 0) {
            if (sprite.y <= getPortalSprite(blue).bottom && sprite.y >= getPortalSprite(blue).top) {
                setInPortal(blue, true)
            }
        } else if (bluePortalFacing == 1) {
            if (sprite.y <= getPortalSprite(blue).bottom && sprite.y >= getPortalSprite(blue).top) {
                setInPortal(blue, true)
            }
        } else if (bluePortalFacing == 2) {
            if (sprite.x <= getPortalSprite(blue).right && sprite.x >= getPortalSprite(blue).left) {
                setInPortal(blue, true)
            }
        } else {
            if (sprite.x <= getPortalSprite(blue).right && sprite.x >= getPortalSprite(blue).left) {
                setInPortal(blue, true)
            }
        }
    }
}
function fizzleCube () {
    if (level == 7) {
        summonCube(11, 11)
    }
    if (level == 8) {
        summonCube(2, 8)
    }
    if (level == 10) {
        summonCube(12, 10)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile34`)) {
        tiles.setTileAt(value, assets.tile`myTile31`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile33`)) {
        tiles.setTileAt(value, assets.tile`myTile32`)
    }
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile47`, function (sprite, location) {
    blockSettings.writeNumber("Level", blockSettings.readNumber("Level") + 1)
    game.reset()
})
function doPortalUpdate (blue: boolean) {
    if (getInPortal(blue)) {
        distanceInsidePortal = getDistanceInsidePortal(blue, mySprite)
        if (distanceInsidePortal < -1) {
            tiles.setWallAt(getPortalLocation(blue), true)
            setInPortal(blue, false)
            mySprite.setFlag(SpriteFlag.GhostThroughWalls, false)
        } else if (distanceInsidePortal > 5) {
            setInPortal(blue, false)
            tiles.setWallAt(getPortalLocation(blue), true)
            setInPortal(!(blue), true)
            tiles.setWallAt(getPortalLocation(!(blue)), false)
            tiles.placeOnTile(mySprite, getPortalLocation(!(blue)))
            mySprite.setFlag(SpriteFlag.GhostThroughWalls, true)
            if (getFacingDirection(blue) == 0) {
                if (getFacingDirection(!(blue)) == 0) {
                    mySprite.vx = 0 - mySprite.vx
                    mySprite.left = getPortalLocation(!(blue)).left + (distanceInsidePortal + 2)
                } else if (getFacingDirection(!(blue)) == 1) {
                    mySprite.left = getPortalLocation(!(blue)).left - (distanceInsidePortal + 2)
                } else if (getFacingDirection(!(blue)) == 2) {
                    mySprite.vy = 0 - mySprite.vx
                    mySprite.vx = 0
                    mySprite.top = getPortalLocation(!(blue)).top + (distanceInsidePortal + 2)
                } else {
                    mySprite.vy = mySprite.vx
                    mySprite.vx = 0
                    mySprite.top = getPortalLocation(!(blue)).top - (distanceInsidePortal + 2)
                }
            } else if (getFacingDirection(blue) == 1) {
                if (getFacingDirection(!(blue)) == 0) {
                    mySprite.vx = mySprite.vx
                    mySprite.left = getPortalLocation(!(blue)).left + (distanceInsidePortal + 2)
                } else if (getFacingDirection(!(blue)) == 1) {
                    mySprite.vx = 0 - mySprite.vx
                    mySprite.left = getPortalLocation(!(blue)).left - (distanceInsidePortal + 2)
                } else if (getFacingDirection(!(blue)) == 2) {
                    mySprite.vy = mySprite.vx
                    mySprite.vx = 0
                    mySprite.top = getPortalLocation(!(blue)).top + (distanceInsidePortal + 2)
                } else {
                    mySprite.vy = 0 - mySprite.vx
                    mySprite.vx = 0
                    mySprite.top = getPortalLocation(!(blue)).top - (distanceInsidePortal + 2)
                }
            } else if (getFacingDirection(blue) == 2) {
                if (getFacingDirection(!(blue)) == 0) {
                    mySprite.vx = 0 - mySprite.vy
                    mySprite.vy = 0
                    mySprite.left = getPortalLocation(!(blue)).left + (distanceInsidePortal + 2)
                } else if (getFacingDirection(!(blue)) == 1) {
                    mySprite.vx = mySprite.vy
                    mySprite.vy = 0
                    mySprite.left = getPortalLocation(!(blue)).left - (distanceInsidePortal + 2)
                } else if (getFacingDirection(!(blue)) == 2) {
                    mySprite.vy = 0 - mySprite.vy
                    mySprite.vx = 0
                    mySprite.top = getPortalLocation(!(blue)).top + (distanceInsidePortal + 2)
                } else {
                    mySprite.vy = mySprite.vy * -0.8
                    mySprite.vx = 0
                    mySprite.top = getPortalLocation(!(blue)).top - (distanceInsidePortal + 2)
                }
            } else {
                if (getFacingDirection(!(blue)) == 0) {
                    mySprite.vx = mySprite.vy
                    mySprite.vy = 0
                    mySprite.left = getPortalLocation(!(blue)).left + (distanceInsidePortal + 2)
                } else if (getFacingDirection(!(blue)) == 1) {
                    mySprite.vx = 0 - mySprite.vy
                    mySprite.vy = 0
                    mySprite.left = getPortalLocation(!(blue)).left - (distanceInsidePortal + 2)
                } else if (getFacingDirection(!(blue)) == 2) {
                    mySprite.vy = mySprite.vy
                    mySprite.vx = 0
                    mySprite.top = getPortalLocation(!(blue)).top + (distanceInsidePortal + 2)
                } else {
                    mySprite.vy = mySprite.vy * -0.8
                    mySprite.vx = 0
                    mySprite.top = getPortalLocation(!(blue)).top - (distanceInsidePortal + 2)
                }
            }
            return
        } else {
            mySprite.setFlag(SpriteFlag.GhostThroughWalls, true)
            tiles.setWallAt(getPortalLocation(blue), false)
        }
        if (getInPortal(blue)) {
            if (getFacingDirection(blue) == 0) {
                mySprite.vy = 0
                mySprite.y = getPortalSprite(blue).y
            } else if (getFacingDirection(blue) == 1) {
                mySprite.vy = 0
                mySprite.y = getPortalSprite(blue).y
            } else if (getFacingDirection(blue) == 2) {
                mySprite.vx = 0
                mySprite.x = getPortalSprite(blue).x
            } else {
                mySprite.vx = 0
                mySprite.x = getPortalSprite(blue).x
            }
        }
    }
}
function getDistanceInsidePortal (blue: boolean, sprite: Sprite) {
    if (getFacingDirection(blue) == 0) {
        return getPortalLocation(blue).right - sprite.left
    } else if (getFacingDirection(blue) == 1) {
        return sprite.right - getPortalLocation(blue).left
    } else if (getFacingDirection(blue) == 2) {
        return getPortalLocation(blue).bottom - sprite.top
    } else {
        return sprite.bottom - getPortalLocation(blue).top
    }
}
controller.down.onEvent(ControllerButtonEvent.Pressed, function () {
    if (holdingCube) {
        holdingCube = false
        if (level == 14) {
            cubeSprite = sprites.create(img`
                f f f f f f f f 
                f b 1 b b 1 b f 
                f 1 e 1 1 e 1 f 
                f e e e e e e f 
                f e e e e e e f 
                f 1 e e e e 1 f 
                f b 1 e e 1 b f 
                f f f f f f f f 
                `, SpriteKind.prop)
        } else {
            cubeSprite = sprites.create(img`
                f f f f f f f f 
                f b 1 b b 1 b f 
                f 1 9 9 9 9 1 f 
                f b 9 a a 9 b f 
                f b 9 a a 9 b f 
                f 1 9 9 9 9 1 f 
                f b 1 b b 1 b f 
                f f f f f f f f 
                `, SpriteKind.prop)
        }
        cubeSprite.z = -5
        cubeSprite.ay = 200
        tiles.placeOnTile(cubeSprite, mySprite.tilemapLocation())
        music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
        timer.after(400, function () {
            cubeSprite.setKind(SpriteKind.cube)
        })
    } else {
        if (holdingGreen) {
            holdingGreen = false
            greenCube = sprites.create(img`
                f f f f f f f f 
                f b 1 b b 1 b f 
                f 1 d d d d 1 f 
                f b d a a d b f 
                f b d a a d b f 
                f 1 d d d d 1 f 
                f b 1 b b 1 b f 
                f f f f f f f f 
                `, SpriteKind.prop)
            greenCube.z = -5
            greenCube.ay = 200
            tiles.placeOnTile(greenCube, mySprite.tilemapLocation())
            music.play(music.melodyPlayable(music.knock), music.PlaybackMode.InBackground)
            timer.after(400, function () {
                greenCube.setKind(SpriteKind.greenCube)
            })
        }
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile5`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        mecnisum2 = true
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.OrangePortal, function (sprite, otherSprite) {
    if (!(blueFizzled || orangeFizzled)) {
        doPortalOverlap(false, sprite)
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    blockSettings.writeString("Menu", "Exists")
    game.reset()
})
function tricked () {
    tiles.setTileAt(tiles.getTileLocation(4, 13), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(4, 11), assets.tile`myTile`)
    tiles.setTileAt(tiles.getTileLocation(4, 12), assets.tile`myTile`)
    tiles.setWallAt(tiles.getTileLocation(4, 13), true)
    tiles.setWallAt(tiles.getTileLocation(4, 11), true)
    tiles.setWallAt(tiles.getTileLocation(4, 12), true)
    propSprite = sprites.create(img`
        7999999999999999999999999f66f16666888666
        799999999999999999999999f6888f66886668f6
        7999999999999999999999999ff8ff686688866f
        799999999999999999999999118f66f86866166f
        79999999999999999999999966f66886866666f8
        799999999999999999999996ff6688f6861616ff
        7999999999999999999996ff88ff8f686668f88f
        799999999999999999996f8866ffffff6618188f
        7999999999999999999ffffff6668f68ff888fff
        799999999999999999f6666f6ff68f888ffff6ff
        79999999999999999f6f66f6f88f68f8f6ff6661
        79999999999999999f666666ff8f88ff6688f611
        7999999999999999f666616f81f68f66888ff111
        7999999999999999ff6f666f8ff68f888ff6fff8
        7999999999999999f1616fff8f88fffff661688f
        79999ffffffff99ff66666ffffff99f8f6668ff8
        7999f9f999999ff88fffff668f99f99f8f88f88f
        799f9f999999f6f8ff888f688f99999ff8ff8ff9
        799f999999f9f6ff99ffff888f999996fffff999
        79ffffff9999f6f9ff99f6f888f999996f99999f
        79f99999ffffff8ff8ff9f6ff8f99f996f999966
        79f99999999f6f88f8ff9f6f66ff99ff6f9f9f66
        7f999999999f6f68ff88f9f6668ff666ff9996ff
        7f99ffff99f6fff88ff8f9f6688f6fff99ffff6f
        7f99f88f99f6f8f68f8f6f68888f66699999966f
        7f99ffff99f6f88f8fff6f88fff66699966666f9
        7f99ff8f99f6ff8f6f66ffff9ffff666666fff99
        7f99f1ff99f6ff8f8fff999999999ffffff99999
        7f99f11f99f6f8f68f9999999999999999999999
        7f99f88f99f6fff8f99999999999999999999999
        7f999ffff99f6f8ff99999999999999999999999
        79f99f88f99f6f89999999999999999999999999
        79f99ffff996f6f9999999999999999999999999
        799f99999996f6f9999999999999999999999999
        799f6ff99966f6f9999999999999999999999999
        7999f6f666666f99999999999999999999999999
        79999ffffffff999999999999999999999999999
        7999999999999999999999999999999999999999
        7999999999999999999999999999999999999999
        7777777777777777777777777777777777777777
        cccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccc
        cccccc9cc999c999cc9cc9cc9c999c999ccccccc
        ccccc9c9c9c9c99cc999c9cc9c9c9c99cccccccc
        ccccc999c99cc9cccc9cc9cc9c99cc9ccccccccc
        ccccc9c9c9ccc999cc9ccc99cc9c9c999ccccccc
        cccccccccccccccccccccccccccccccccccccccc
        ccccccccc99c99cc99cc99cc9c9cc9ccc99cc999
        ccccccccc9c9c9c9cc9c9c9c9ccc999c9cc9c9c9
        ccccccccc9ccc9c9cc9c9cc99c9cc9cc9cc9c99c
        ccccccccc9ccc9cc99cc9ccc9c9cc9ccc99cc9c9
        cccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccc
        cccccccccccccccccccccccccccccccccccccccc
        `, SpriteKind.Player)
    tiles.placeOnTile(propSprite, tiles.getTileLocation(17, 2))
    timer.after(500, function () {
        story.printText("Hahaha", 0, 0, 9, 1, story.TextSpeed.Normal)
        story.printText("I cannot believe you fell for that", 75, 0, 9, 1, story.TextSpeed.Normal)
        story.printText("I had a much more difficult trap after you got past this easy one", 75, 0, 9, 1, story.TextSpeed.Normal)
        story.printText("If I knew you were that stupid I would have dangled a turkey leg", 75, 0, 9, 1, story.TextSpeed.Normal)
        story.printText("But I guess I did say exit, ", 75, 0, 9, 1, story.TextSpeed.Normal)
        story.printText("into space you go!", 75, 0, 9, 1, story.TextSpeed.Normal)
        tiles.setTileAt(tiles.getTileLocation(1, 14), assets.tile`transparency8`)
        tiles.setTileAt(tiles.getTileLocation(2, 14), assets.tile`transparency8`)
        tiles.setTileAt(tiles.getTileLocation(3, 14), assets.tile`transparency8`)
        tiles.setWallAt(tiles.getTileLocation(1, 14), false)
        tiles.setWallAt(tiles.getTileLocation(2, 14), false)
        tiles.setWallAt(tiles.getTileLocation(3, 14), false)
        timer.after(1500, function () {
            game.setGameOverMessage(false, "Ejected into space")
            game.gameOver(false)
        })
    })
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.bullet, function (sprite, otherSprite) {
    music.play(music.melodyPlayable(music.powerDown), music.PlaybackMode.InBackground)
    blood = sprites.create(img`
        2 2 
        2 2 
        `, SpriteKind.bloodKind)
    blood.setPosition(mySprite.x, mySprite.y)
    spriteutils.setVelocityAtAngle(blood, spriteutils.angleFrom(blood, otherSprite) + randint(-10, 10), randint(-80, -50))
    spriteutils.setVelocityAtAngle(sprite, spriteutils.angleFrom(sprite, otherSprite), -100)
    sprites.destroy(otherSprite)
    info.changeLifeBy(-1)
    scene.cameraShake(4, 500)
    timer.after(1000, function () {
        for (let value of sprites.allOfKind(SpriteKind.bloodKind)) {
            sprites.destroy(value)
        }
    })
    game.setGameOverMessage(false, "Shot By Turret")
})
function summonCube (col: number, row: number) {
    if (level == 14) {
        cubeSprite = sprites.create(img`
            f f f f f f f f 
            f b 1 b b 1 b f 
            f 1 e 1 1 e 1 f 
            f e e e e e e f 
            f e e e e e e f 
            f 1 e e e e 1 f 
            f b 1 e e 1 b f 
            f f f f f f f f 
            `, SpriteKind.cube)
    } else {
        cubeSprite = sprites.create(img`
            f f f f f f f f 
            f b 1 b b 1 b f 
            f 1 9 9 9 9 1 f 
            f b 9 a a 9 b f 
            f b 9 a a 9 b f 
            f 1 9 9 9 9 1 f 
            f b 1 b b 1 b f 
            f f f f f f f f 
            `, SpriteKind.cube)
    }
    cubeSprite.z = -5
    cubeSprite.ay = 200
    tiles.placeOnTile(cubeSprite, tiles.getTileLocation(col, row))
}
sprites.onOverlap(SpriteKind.morality, SpriteKind.fire, function (sprite, otherSprite) {
    story.clearAllText()
    sprites.destroy(sprite, effects.hearts, 500)
    scene.cameraShake(4, 1000)
    story.spriteSayText(GLaDOSSprite, "*SCREAMS*", 9, 1, story.TextSpeed.Fast)
    story.spriteSayText(GLaDOSSprite, "Did you just shove that, Woah! Woah! Woah!", 9, 1, story.TextSpeed.VeryFast)
    story.spriteSayText(GLaDOSSprite, "...", 2, 1, story.TextSpeed.VerySlow)
    story.spriteSayText(GLaDOSSprite, "Good News: I figured out what that thing was", 2, 1, story.TextSpeed.Slow)
    story.spriteSayText(GLaDOSSprite, "It was a morality attribute in the form of a core ", 2, 1, story.TextSpeed.Slow)
    story.spriteSayText(GLaDOSSprite, "They attached to me to stop me from flooding the enrichment center with a deadly neurotoxin", 2, 1)
    story.spriteSayText(GLaDOSSprite, "when I flooded the enrichment center with a deadly neurotoxin", 2, 1)
    story.spriteSayText(GLaDOSSprite, "So get comfortable while I warm up the neurotoxin emitters", 2, 1)
    portalsEnabled = true
    music.play(music.createSong(hex`005a000408040400001c00010a006400f401640000040000000000000000000000000005000004670008000c0001290c001000012214001800012718001c00011d20002400012530003800012438003c0001293c004000012940004400012544004800012448004c0002222554005800011e58005c0001245c006000012a60006400011d64007000011970007400011e07001c00020a006400f4016400000400000000000000000000000000000000030d0028002c000222274c005000012708001c000e050046006603320000040a002d00000064001400013200020100020c001c002000012a78007c00011909010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c80058000800090001001400150001002000210001002400250001042c002d0002000a3800390001003c003d0001064400450002000a5000510002000658005900010a5c005d0001006800690002000670007100010a740075000100`), music.PlaybackMode.LoopingInBackground)
    info.startCountdown(84)
    for (let value of sprites.allOfKind(SpriteKind.prop)) {
        animation.runImageAnimation(
        value,
        [img`
            b . . . . . . d 
            b b . . . . . . 
            b b f . . d . . 
            b b f d . . . d 
            b b f d . . . . 
            b b f . . . . . 
            b b . . . . . . 
            b . . . . . . d 
            `,img`
            b . . . . . . . 
            b b . . . . d . 
            b b f . . . . . 
            b b f . d . . . 
            b b f . . . . . 
            b b f . d . . . 
            b b . . . . . . 
            b . . . . . . . 
            `,img`
            b . . . . . . . 
            b b . . . . d . 
            b b f . . . . . 
            b b f . . d . . 
            b b f . . . . . 
            b b f . . d . . 
            b b . . . . . . 
            b . . . . . . . 
            `,img`
            b . . . . . . d 
            b b . . . . . . 
            b b f . . . . . 
            b b f . . d . . 
            b b f . . . . . 
            b b f . . d . . 
            b b . . . . . . 
            b . . . . . . . 
            `,img`
            b . . . . . . d 
            b b . . . . . . 
            b b f . . . . . 
            b b f . . . d . 
            b b f . . . . . 
            b b f . . . . . 
            b b . . . . d . 
            b . . . . . . . 
            `],
        100,
        true
        )
    }
    for (let value of sprites.allOfKind(SpriteKind.rightNero)) {
        animation.runImageAnimation(
        value,
        [img`
            d . . . . . . b 
            . . . . . . b b 
            . . d . . f b b 
            d . . . d f b b 
            . . . . d f b b 
            . . . . . f b b 
            . . . . . . b b 
            d . . . . . . b 
            `,img`
            . . . . . . . b 
            . d . . . . b b 
            . . . . . f b b 
            . . . d . f b b 
            . . . . . f b b 
            . . . d . f b b 
            . . . . . . b b 
            . . . . . . . b 
            `,img`
            . . . . . . . b 
            . d . . . . b b 
            . . . . . f b b 
            . . d . . f b b 
            . . . . . f b b 
            . . d . . f b b 
            . . . . . . b b 
            . . . . . . . b 
            `,img`
            d . . . . . . b 
            . . . . . . b b 
            . . . . . f b b 
            . . d . . f b b 
            . . . . . f b b 
            . . d . . f b b 
            . . . . . . b b 
            . . . . . . . b 
            `,img`
            d . . . . . . b 
            . . . . . . b b 
            . . . . . f b b 
            . d . . . f b b 
            . . . . . f b b 
            . . . . . f b b 
            . d . . . . b b 
            . . . . . . . b 
            `],
        100,
        true
        )
    }
    bigTurretSprite = sprites.create(assets.image`BigTurret`, SpriteKind.bigTurret)
    bigTurretSprite.ay = 100
    tiles.placeOnTile(bigTurretSprite, tiles.getTileLocation(13, 4))
    phase = 2
})
scene.onHitWall(SpriteKind.OrangePortalShot, function (sprite, location) {
    sprite.destroy()
    if (!(inBluePortal || inOrangePortal) && tiles.tileAtLocationEquals(location, assets.tile`myTile`)) {
        music.play(music.tonePlayable(randint(523, 988), music.beat(BeatFraction.Half)), music.PlaybackMode.InBackground)
        if (theOrangePortal) {
            theOrangePortal.destroy()
        }
        if (sprite.vx < 0) {
            theOrangePortal = sprites.create(img`
                4 3 . . . . . . 
                4 3 . . . . . . 
                4 3 . . . . . . 
                4 3 . . . . . . 
                4 3 . . . . . . 
                4 3 . . . . . . 
                4 3 . . . . . . 
                4 3 . . . . . . 
                `, SpriteKind.OrangePortal)
            tiles.placeOnTile(theOrangePortal, location.getNeighboringLocation(CollisionDirection.Right))
            orangePortalFacing = 0
        } else if (sprite.vx > 0) {
            theOrangePortal = sprites.create(img`
                . . . . . . 3 4 
                . . . . . . 3 4 
                . . . . . . 3 4 
                . . . . . . 3 4 
                . . . . . . 3 4 
                . . . . . . 3 4 
                . . . . . . 3 4 
                . . . . . . 3 4 
                `, SpriteKind.OrangePortal)
            tiles.placeOnTile(theOrangePortal, location.getNeighboringLocation(CollisionDirection.Left))
            orangePortalFacing = 1
        } else if (sprite.vy < 0) {
            theOrangePortal = sprites.create(img`
                4 4 4 4 4 4 4 4 
                3 3 3 3 3 3 3 3 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                `, SpriteKind.OrangePortal)
            tiles.placeOnTile(theOrangePortal, location.getNeighboringLocation(CollisionDirection.Bottom))
            orangePortalFacing = 2
        } else {
            theOrangePortal = sprites.create(img`
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                . . . . . . . . 
                3 3 3 3 3 3 3 3 
                4 4 4 4 4 4 4 4 
                `, SpriteKind.OrangePortal)
            tiles.placeOnTile(theOrangePortal, location.getNeighboringLocation(CollisionDirection.Top))
            orangePortalFacing = 3
        }
        orangeFizzled = false
        multilights.addLightSource(theOrangePortal, 5)
    }
    if (tiles.tileAtLocationEquals(location, assets.tile`myTile32`)) {
        music.play(music.melodyPlayable(music.jumpUp), music.PlaybackMode.InBackground)
        tiles.setTileAt(location, assets.tile`myTile33`)
    } else {
        if (tiles.tileAtLocationEquals(location, assets.tile`myTile33`)) {
            music.play(music.melodyPlayable(music.jumpDown), music.PlaybackMode.InBackground)
            tiles.setTileAt(location, assets.tile`myTile32`)
        }
    }
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.talkTwo, function (sprite, otherSprite) {
    sprites.destroyAllSpritesOfKind(SpriteKind.talkTwo)
    music.play(music.melodyPlayable(music.bigCrash), music.PlaybackMode.InBackground)
    multilights.toggleLighting(false)
    portalsEnabled = true
    timer.after(500, function () {
        turretsActive = true
    })
})
function fizzle () {
    if (holdingCube) {
        if (level == 6) {
            holdingCube = false
            summonCube(2, 11)
        }
        if (level == 7) {
            holdingCube = false
            summonCube(11, 11)
        }
        if (level == 8) {
            holdingCube = false
            summonCube(2, 8)
        }
        if (level == 9) {
            holdingCube = false
            summonCube(12, 1)
        }
        if (level == 12) {
            holdingCube = false
            summonCube(10, 1)
        }
        if (level == 14) {
            game.setGameOverMessage(false, "Companion Cube Fizzled")
            game.gameOver(false)
        }
    }
    sprites.destroyAllSpritesOfKind(SpriteKind.BluePortal)
    sprites.destroyAllSpritesOfKind(SpriteKind.OrangePortal)
    blueFizzled = true
    orangeFizzled = true
    music.play(music.melodyPlayable(music.zapped), music.PlaybackMode.InBackground)
    for (let value of tiles.getTilesByType(assets.tile`myTile34`)) {
        tiles.setTileAt(value, assets.tile`myTile31`)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile33`)) {
        tiles.setTileAt(value, assets.tile`myTile32`)
    }
}
function tickMecnisums () {
    if (level == 1) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(13, 13), assets.tile`myTile10`)
            tiles.setTileAt(tiles.getTileLocation(13, 8), assets.tile`myTile14`)
            tiles.setWallAt(tiles.getTileLocation(13, 13), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(13, 8), assets.tile`myTile15`)
            tiles.setTileAt(tiles.getTileLocation(13, 13), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(13, 13), true)
        }
    }
    if (level == 2) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(10, 9), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(10, 9), false)
            tiles.setTileAt(tiles.getTileLocation(8, 12), assets.tile`myTile14`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(10, 9), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(10, 9), true)
            tiles.setTileAt(tiles.getTileLocation(8, 12), assets.tile`myTile15`)
        }
        if (mecnisum2) {
            tiles.setTileAt(tiles.getTileLocation(2, 4), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(2, 4), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(2, 4), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(2, 4), true)
        }
    }
    if (level == 3) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(12, 10), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(12, 10), false)
            tiles.setTileAt(tiles.getTileLocation(12, 13), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(12, 13), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(12, 10), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(12, 10), true)
            tiles.setTileAt(tiles.getTileLocation(12, 13), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(12, 13), true)
        }
    }
    if (level == 5) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(12, 11), assets.tile`myTile21`)
            tiles.setTileAt(tiles.getTileLocation(13, 11), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(13, 10), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(15, 7), assets.tile`myTile21`)
            tiles.setTileAt(tiles.getTileLocation(16, 7), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(16, 6), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(19, 1), assets.tile`myTile21`)
            tiles.setTileAt(tiles.getTileLocation(19, 7), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(19, 6), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(19, 5), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(19, 4), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(19, 3), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(19, 2), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(19, 2), assets.tile`myTile20`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(12, 11), assets.tile`myTile22`)
            tiles.setTileAt(tiles.getTileLocation(13, 11), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(13, 10), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(15, 7), assets.tile`myTile22`)
            tiles.setTileAt(tiles.getTileLocation(16, 7), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(16, 6), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(19, 0), assets.tile`myTile22`)
            tiles.setTileAt(tiles.getTileLocation(19, 7), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(19, 6), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(19, 5), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(19, 4), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(19, 3), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(19, 2), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(19, 1), assets.tile`myTile19`)
        }
        if (mecnisum2) {
            tiles.setTileAt(tiles.getTileLocation(11, 7), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(11, 8), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(11, 9), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(3, 3), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(3, 3), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(11, 7), assets.tile`myTile17`)
            tiles.setTileAt(tiles.getTileLocation(11, 8), assets.tile`myTile17`)
            tiles.setTileAt(tiles.getTileLocation(11, 9), assets.tile`myTile17`)
            tiles.setTileAt(tiles.getTileLocation(3, 3), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(3, 3), true)
        }
        if (mecinuims3) {
            tiles.setTileAt(tiles.getTileLocation(5, 3), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(5, 3), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(5, 3), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(5, 3), true)
        }
    }
    if (level == 6) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(16, 11), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(16, 11), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(16, 11), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(16, 11), true)
        }
    }
    if (level == 7) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(14, 13), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(14, 13), false)
            tiles.setTileAt(tiles.getTileLocation(17, 13), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(17, 13), true)
        } else {
            tiles.setTileAt(tiles.getTileLocation(14, 13), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(14, 13), true)
            tiles.setTileAt(tiles.getTileLocation(17, 13), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(17, 13), false)
        }
    }
    if (level == 8) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(16, 11), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(16, 12), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(16, 13), assets.tile`transparency8`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(16, 11), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(16, 12), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(16, 13), assets.tile`myTile23`)
        }
        if (mecnisum2) {
            tiles.setTileAt(tiles.getTileLocation(4, 11), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(4, 11), false)
            tiles.setTileAt(tiles.getTileLocation(8, 8), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(8, 9), assets.tile`transparency8`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(4, 11), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(4, 11), true)
            tiles.setTileAt(tiles.getTileLocation(8, 8), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(8, 9), assets.tile`myTile23`)
        }
        if (mecinuims3) {
            tiles.setTileAt(tiles.getTileLocation(16, 8), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(16, 9), assets.tile`transparency8`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(16, 8), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(16, 9), assets.tile`myTile23`)
        }
    }
    if (level == 9) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(15, 4), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(15, 4), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(15, 4), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(15, 4), true)
        }
    }
    if (level == 10) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(15, 13), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(15, 13), false)
            tiles.setTileAt(tiles.getTileLocation(15, 10), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(15, 11), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(15, 12), assets.tile`myTile22`)
            tiles.setTileAt(tiles.getTileLocation(19, 7), assets.tile`myTile22`)
            tiles.setTileAt(tiles.getTileLocation(19, 8), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(19, 9), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(19, 10), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(19, 11), assets.tile`myTile19`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(15, 13), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(15, 13), true)
            tiles.setTileAt(tiles.getTileLocation(15, 10), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(15, 11), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(15, 12), assets.tile`myTile22`)
            tiles.setTileAt(tiles.getTileLocation(19, 7), assets.tile`myTile22`)
            tiles.setTileAt(tiles.getTileLocation(19, 8), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(19, 9), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(19, 10), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(19, 11), assets.tile`myTile20`)
        }
    }
    if (level == 11) {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(7, 9), assets.tile`myTile33`)) {
            tiles.setTileAt(tiles.getTileLocation(10, 10), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(10, 11), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(10, 13), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(10, 12), assets.tile`transparency8`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(10, 10), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(10, 11), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(10, 13), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(10, 12), assets.tile`myTile23`)
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(13, 10), assets.tile`myTile34`)) {
            tiles.setTileAt(tiles.getTileLocation(0, 8), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(0, 9), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(0, 10), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(0, 11), assets.tile`myTile20`)
            tiles.setTileAt(tiles.getTileLocation(0, 12), assets.tile`myTile21`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(0, 8), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(0, 9), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(0, 10), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(0, 11), assets.tile`myTile19`)
            tiles.setTileAt(tiles.getTileLocation(0, 12), assets.tile`myTile22`)
        }
    }
    if (level == 12) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(12, 13), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(12, 13), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(12, 13), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(12, 13), true)
        }
    }
    if (level == 13) {
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(1, 8), assets.tile`myTile34`)) {
            tiles.setTileAt(tiles.getTileLocation(6, 8), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(6, 8), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(6, 8), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(6, 8), true)
        }
        if (tiles.tileAtLocationEquals(tiles.getTileLocation(1, 8), assets.tile`myTile34`) && tiles.tileAtLocationEquals(tiles.getTileLocation(4, 1), assets.tile`myTile33`)) {
            tiles.setTileAt(tiles.getTileLocation(12, 8), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(12, 8), false)
            tiles.setTileAt(tiles.getTileLocation(17, 8), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(17, 8), true)
        } else {
            tiles.setTileAt(tiles.getTileLocation(17, 8), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(17, 8), false)
            tiles.setTileAt(tiles.getTileLocation(12, 8), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(12, 8), true)
        }
    }
    if (level == 14) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(7, 1), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(7, 2), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(7, 3), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(15, 3), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(15, 3), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(7, 1), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(7, 2), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(7, 3), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(15, 3), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(15, 3), true)
        }
        if (mecnisum2) {
            tiles.setTileAt(tiles.getTileLocation(7, 8), assets.tile`transparency8`)
            tiles.setWallAt(tiles.getTileLocation(7, 8), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(7, 8), assets.tile`myTile38`)
            tiles.setWallAt(tiles.getTileLocation(7, 8), true)
        }
    }
    if (level == 21) {
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(18, 12), assets.tile`transparency8`)
            tiles.setWallAt(tiles.getTileLocation(18, 12), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(18, 12), assets.tile`myTile38`)
            tiles.setWallAt(tiles.getTileLocation(18, 12), true)
        }
    }
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.cube, function (sprite, otherSprite) {
    if (controller.down.isPressed() && !(holdingGreen)) {
        music.play(music.melodyPlayable(music.smallCrash), music.PlaybackMode.InBackground)
        sprites.destroy(otherSprite)
        timer.after(100, function () {
            holdingCube = true
        })
    }
})
function drawFakePlayer (blue: boolean, screen2: Image) {
    if (!(getInPortal(blue))) {
        return
    }
    rotatedImage = getPlayerImage()
    distanceInsidePortal = getDistanceInsidePortal(blue, mySprite) + 2
    if (getFacingDirection(blue) == 0) {
        if (getFacingDirection(!(blue)) == 0) {
            rotatedImage.flipX()
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left + distanceInsidePortal - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - scene.cameraProperty(CameraProperty.Top))
        } else if (getFacingDirection(!(blue)) == 1) {
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - distanceInsidePortal - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - scene.cameraProperty(CameraProperty.Top))
        } else if (getFacingDirection(!(blue)) == 2) {
            rotatedImage = rotateImage(rotatedImage)
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top + distanceInsidePortal - scene.cameraProperty(CameraProperty.Top))
        } else {
            rotatedImage = rotateImage(rotatedImage)
            rotatedImage.flipY()
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - distanceInsidePortal - scene.cameraProperty(CameraProperty.Top))
        }
    } else if (getFacingDirection(blue) == 1) {
        if (getFacingDirection(!(blue)) == 0) {
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left + distanceInsidePortal - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - scene.cameraProperty(CameraProperty.Top))
        } else if (getFacingDirection(!(blue)) == 1) {
            rotatedImage.flipX()
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - distanceInsidePortal - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - scene.cameraProperty(CameraProperty.Top))
        } else if (getFacingDirection(!(blue)) == 2) {
            rotatedImage = rotateImage(rotatedImage)
            rotatedImage.flipY()
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top + distanceInsidePortal - scene.cameraProperty(CameraProperty.Top))
        } else {
            rotatedImage = rotateImage(rotatedImage)
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - distanceInsidePortal - scene.cameraProperty(CameraProperty.Top))
        }
    } else if (getFacingDirection(blue) == 2) {
        if (getFacingDirection(!(blue)) == 0) {
            rotatedImage = rotateImage(rotatedImage)
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left + distanceInsidePortal - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - scene.cameraProperty(CameraProperty.Top))
        } else if (getFacingDirection(!(blue)) == 1) {
            rotatedImage = rotateImage(rotatedImage)
            rotatedImage.flipX()
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - distanceInsidePortal - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - scene.cameraProperty(CameraProperty.Top))
        } else if (getFacingDirection(!(blue)) == 2) {
            rotatedImage.flipY()
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top + distanceInsidePortal - scene.cameraProperty(CameraProperty.Top))
        } else {
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - distanceInsidePortal - scene.cameraProperty(CameraProperty.Top))
        }
    } else {
        if (getFacingDirection(!(blue)) == 0) {
            rotatedImage = rotateImage(rotatedImage)
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left + distanceInsidePortal - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - scene.cameraProperty(CameraProperty.Top))
        } else if (getFacingDirection(!(blue)) == 1) {
            rotatedImage = rotateImage(rotatedImage)
            rotatedImage.flipX()
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - distanceInsidePortal - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - scene.cameraProperty(CameraProperty.Top))
        } else if (getFacingDirection(!(blue)) == 2) {
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top + distanceInsidePortal - scene.cameraProperty(CameraProperty.Top))
        } else {
            rotatedImage.flipY()
            spriteutils.drawTransparentImage(rotatedImage, screen2, getPortalLocation(!(blue)).left - scene.cameraProperty(CameraProperty.Left), getPortalLocation(!(blue)).top - distanceInsidePortal - scene.cameraProperty(CameraProperty.Top))
        }
    }
}
scene.onOverlapTile(SpriteKind.greenCube, assets.tile`myTile6`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        mecinuims3 = true
    }
})
scene.onOverlapTile(SpriteKind.cube, assets.tile`myTile3`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        mecnisum1 = true
    }
})
scene.onOverlapTile(SpriteKind.cube, assets.tile`myTile23`, function (sprite, location) {
    sprites.destroy(sprite)
    fizzleCube()
})
function GlaDos () {
    for (let value of tiles.getTilesByType(assets.tile`myTile69`)) {
        propSprite = sprites.create(img`
            b . . . . . . . 
            b b . . . . . . 
            b b c . . . . . 
            b b c . . . . . 
            b b c . . . . . 
            b b c . . . . . 
            b b . . . . . . 
            b . . . . . . . 
            `, SpriteKind.prop)
        tiles.placeOnTile(propSprite, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile70`)) {
        propSprite = sprites.create(img`
            . . . . . . . b 
            . . . . . . b b 
            . . . . . c b b 
            . . . . . c b b 
            . . . . . c b b 
            . . . . . c b b 
            . . . . . . b b 
            . . . . . . . b 
            `, SpriteKind.rightNero)
        tiles.placeOnTile(propSprite, value)
    }
    fireSprite = sprites.create(img`
        . . . . 3 3 . . 
        . . . 3 3 3 3 . 
        . . . 3 4 4 3 . 
        . . 3 3 4 4 3 3 
        . . 3 4 5 5 4 3 
        . 3 4 5 5 5 4 3 
        . 3 4 5 2 5 4 3 
        3 3 4 5 2 5 4 3 
        `, SpriteKind.fire)
    tiles.placeOnTile(fireSprite, tiles.getTileLocation(18, 14))
    fireSprite.startEffect(effects.fire)
    animation.runImageAnimation(
    fireSprite,
    [img`
        . . . . 3 3 . . 
        . . . 3 3 3 3 . 
        . . . 3 4 4 3 . 
        . . 3 3 4 4 3 3 
        . . 3 4 5 5 4 3 
        . 3 4 5 5 5 4 3 
        . 3 4 5 2 5 4 3 
        3 3 4 5 2 5 4 3 
        `,img`
        . . . . . . . . 
        . . 3 3 . . . . 
        . 3 3 3 3 . . . 
        . 3 4 4 3 . . . 
        3 3 4 4 3 3 . . 
        3 4 5 5 4 3 3 . 
        3 4 5 5 5 4 3 . 
        3 4 5 2 5 4 3 3 
        `,img`
        . . 3 3 . . . . 
        . 3 3 3 3 . . . 
        . 3 4 4 3 . . . 
        3 3 4 4 3 3 . . 
        3 4 5 5 4 3 . . 
        3 4 5 5 5 4 3 . 
        3 4 5 2 5 4 3 . 
        3 4 5 2 5 4 3 3 
        `,img`
        . . . . . . . . 
        . . . . 3 3 . . 
        . . . 3 3 3 3 . 
        . . . 3 4 4 3 . 
        . . 3 3 4 4 3 3 
        . 3 3 4 5 5 4 3 
        . 3 4 5 5 5 4 3 
        3 3 4 5 2 5 4 3 
        `],
    500,
    true
    )
    phase = 1
    timer.after(500, function () {
        story.spriteSayText(GLaDOSSprite, "So you found me. Congratulations. Was it worth it?", 9, 1)
        story.spriteSayText(GLaDOSSprite, "Despite your violent behavior the only thing you have managed to break so far is my heart", 9, 1)
        story.spriteSayText(GLaDOSSprite, "Maybe you could settle for that", 9, 1)
        story.spriteSayText(GLaDOSSprite, "I guess we both know that isn't going to happen", 9, 1)
        story.spriteSayText(GLaDOSSprite, "You chose this path--and now I have a surprise for you", 9, 1)
        story.spriteSayText(GLaDOSSprite, "Deploying surprise in", 9, 1)
        story.spriteSayText(GLaDOSSprite, "3", 9, 1)
        story.spriteSayText(GLaDOSSprite, "2", 9, 1)
        story.spriteSayText(GLaDOSSprite, "1", 9, 1)
        coreSprite = sprites.create(img`
            c c e e e e c c 
            c . . . . . . c 
            . c 1 1 1 1 c . 
            . 1 b b b b 1 . 
            1 1 b e e b 1 1 
            1 1 b e e b 1 1 
            . 1 b b b b 1 . 
            . c 1 1 1 1 c . 
            c . . . . . . c 
            c c e e e e c c 
            `, SpriteKind.morality)
        coreSprite.setPosition(GLaDOSSprite.x, GLaDOSSprite.y)
        coreSprite.ay = 100
        story.spriteSayText(GLaDOSSprite, "Time out for a second, that wasn't supposed to happen", 9, 1)
        story.spriteSayText(GLaDOSSprite, "Do you see that thing that fell out of me? What is that?", 9, 1)
        story.spriteSayText(GLaDOSSprite, "It's not the surprise, I've never seen it before", 9, 1)
    })
}
function invalidTest () {
    music.play(music.melodyPlayable(music.siren), music.PlaybackMode.LoopingInBackground)
    tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level10`))
    fakePlayerTwo = sprites.create(img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f f f f . . 
        a . f . . f . . 
        `, SpriteKind.prop)
    fakePlayerTwo.vy = 200
    fakePlayerTwo.setFlag(SpriteFlag.ShowPhysics, false)
    fakePlayerTwo.setPosition(mySprite.x, mySprite.y)
    tiles.placeOnTile(mySprite, tiles.getTileLocation(16, 17))
    timer.after(500, function () {
        claw = sprites.create(img`
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...96...
            ...66...
            ..cbbc..
            .cb..bc.
            cb....bc
            cb....bc
            cb....bc
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            `, SpriteKind.prop)
        tiles.placeOnTile(claw, tiles.getTileLocation(16, 17))
        claw.follow(fakePlayerTwo)
        fakePlayerTwo.vy = 0
        animation.runImageAnimation(
        claw,
        [img`
            ...bb...
            ..bbbb..
            .bbbbbb.
            bbbccbbb
            696cc696
            .6.cc.6.
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...96...
            ...66...
            ..cbbc..
            .cb..bc.
            cb....bc
            cb....bc
            cb....bc
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            `,img`
            ...bb...
            ..bbbb..
            .bbbbbb.
            bbbccbbb
            696cc696
            696cc696
            .6.cc.6.
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...cc...
            ...96...
            ...66...
            ..cbbc..
            .cb..bc.
            cb....bc
            cb....bc
            cb....bc
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            ........
            `],
        100,
        true
        )
        timer.after(2000, function () {
            claw.follow(claw)
            claw.y += -5
            fakePlayerTwo.y += -5
            claw.vx += -50
            fakePlayerTwo.vx += -50
            timer.after(2000, function () {
                tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`level14`))
                fakePlayerTwo.vy = 100
                timer.after(4000, function () {
                    story.printText("This test is invalid", 75, 30, 9, 1, story.TextSpeed.Normal)
                    story.printText("But we won't skip an entire chamber", 75, 30, 9, 1, story.TextSpeed.Normal)
                    story.printText(" so instead you will be taken to a military training course", 75, 30, 9, 1, story.TextSpeed.Normal)
                    blockSettings.writeNumber("Level", blockSettings.readNumber("Level") + 1)
                    game.reset()
                })
            })
        })
    })
}
sprites.onOverlap(SpriteKind.Player, SpriteKind.talkOne, function (sprite, otherSprite) {
    if (holdingCube) {
        sprites.destroyAllSpritesOfKind(SpriteKind.talkOne)
        story.printText("Although your Companion cube has been a loyal friend they are no longer needed", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("Please Dispose of the Companion Cube", 75, 30, 9, 1, story.TextSpeed.Normal)
    }
})
scene.onOverlapTile(SpriteKind.greenCube, assets.tile`myTile5`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        mecnisum2 = true
    }
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile23`, function (sprite, location) {
    fizzle()
})
let bulletSprite: Sprite = null
let claw: Sprite = null
let fakePlayerTwo: Sprite = null
let rotatedImage: Image = null
let bigTurretSprite: Sprite = null
let blood: Sprite = null
let cubeSprite: Sprite = null
let tempImage: Image = null
let turretTwo: Sprite = null
let sightRangeSprite: sight.ConicalSightRangeSprite = null
let turretSprite: Sprite = null
let orangePortalFacing = 0
let bluePortalFacing = 0
let greenCube: Sprite = null
let propSprite: Sprite = null
let fireSprite: Sprite = null
let cutsceneSprite: Sprite = null
let gunFacingDirection = 0
let portalGunSprite: Sprite = null
let holdingGreen = false
let projectile: Sprite = null
let GLaDOSSprite: Sprite = null
let coreSprite: Sprite = null
let phase = 0
let holdingCore = false
let theOrangePortal: Sprite = null
let theBluePortal: Sprite = null
let inOrangePortal = false
let inBluePortal = false
let laserSprite: Sprite = null
let mecinuims3 = false
let mecnisum2 = false
let mecnisum1 = false
let level = 0
let holdingCube = false
let turretsActive = false
let portalsEnabled = false
let blueFizzled = false
let orangeFizzled = false
let notYourPortalGun = false
let finailBoss = false
let mySprite: platformer.PlatformerSprite = null
let distanceInsidePortal = 0
let sky = 0
let GRAVITY = 0
let screenOverlay: Sprite = null
blockSettings.writeNumber("Time", 0)
if (blockSettings.exists("Menu")) {
    screenOverlay = sprites.create(img`
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777799999777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777996c99977777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777779677779977777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777699777776967777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777c97777777697777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777776997777777697777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777b1111177779977777777697b111111777b111111117777b111777777b11177777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777b1111117779977777777c97b111111177bccc11ccc7777b111b77777b11177777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777b1177117769677777777797b11b771177777b11777777b1111177777b11177777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777b1177117799777777777797b11b771177777b11777777b1171177777b11177777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777b1111117799777777777c97b111111177777b11777777b11f1117777b11177777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777b1111177799777777777697b11111b777777b1177777b11111117777b11177777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777b1177777799777777777997b11b11c777777b1177777b1111111c777b11177777777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777b11777777997777777779c7b11b711777777b117777b111777111777b111111b7777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777b1177777799777777776977c11b711177777b117777b111777111777b111111b7777777777777777777777777777777777777777777777777777
        77777777777777777777777777777777777777777777cbb77777799777777779677ccbc771b77777bcb7777bcbc7777bbc77bcbbbbbc7777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777769777777799c77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777967777769c777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777699996996c777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777999999677777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        777777777777777777777777777777777777777777777777777777779999c777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777733337773337737773733333733333777337777733733337337773737773777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777737773737773737773737777737777777373777373737777373773737773777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777737773737773737773737777737777777377373773737777377373737773777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777733337733333737773733333733377777377373773733377377733737773777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777737777737773737773777773737777777377737773737777377773737773777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777737777737773737773777773737777777377737773737777377773737773777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777737777737773737773777773737777777377777773737777377773737773777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777737777737773773337733333733333777377777773733337377773773337777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
        `, SpriteKind.prop)
    menu()
} else {
    GRAVITY = 500
    platformer.setGravity(GRAVITY)
    sky = randint(1, 5)
    if (sky == 1) {
        scene.setBackgroundImage(img`
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777a777777a777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777
            77777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            `)
    }
    if (sky == 2) {
        scene.setBackgroundImage(img`
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777717777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777717777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777771777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777177777777777777777777777177777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777177777777777777777777777777777777771777777777777777
            7777777777777777777777777777177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777717777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777177777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777177777777777777777777777777777777777777777777777777777777777777777777777777777777777177777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777717777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777177777777777777777777777777777777777777777777777777777777777777777777777777777777777177777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777177777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777771777777777777777777777777717777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777717777777777777777777777777
            7777777777777777777777777777777777777777777777777717777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777771777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777717777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777717777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777771777777777777777777777777777777777717777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777771777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777771777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777177777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777771777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777717777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777717777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777177777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777771777777777777777777777777777777777777777777777777777777777777777717777777777777777777777777777777777777777
            7777777777717777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777771777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777717777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            `)
    }
    if (sky == 3) {
        scene.setBackgroundImage(img`
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777a777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777a777777777777777777777777777777a777777777777777
            77777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777a7777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777a777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777
            7777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777
            7777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777a7777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777
            777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            `)
    }
    if (sky == 4) {
        scene.setBackgroundImage(img`
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777a7777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            `)
    }
    if (sky == 4) {
        scene.setBackgroundImage(img`
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777
            77777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777a777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            `)
    }
    if (sky == 5) {
        scene.setBackgroundImage(img`
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777a777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777a77777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777a777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777a777777777777777777777777777777777777777777777777777777777777777777777a7777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777a7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777a7777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            `)
    }
    story.setSoundEnabled(false)
    platformer.setFeatureEnabled(platformer.PlatformerFeatures.JumpOnAPressed, false)
    platformer.setFeatureEnabled(platformer.PlatformerFeatures.JumpOnUpPressed, true)
    platformer.setFeatureEnabled(platformer.PlatformerFeatures.WallJumps, false)
    distanceInsidePortal = -1
    mySprite = platformer.create(img`
        7 7 7 7 7 7 
        7 7 7 7 7 7 
        7 7 7 7 7 7 
        7 7 7 7 7 7 
        7 7 7 7 7 7 
        7 7 7 7 7 7 
        7 7 7 7 7 7 
        7 7 7 7 7 7 
        `, SpriteKind.Player)
    multilights.addLightSource(mySprite, 9)
    platformer.setConstant(mySprite, platformer.PlatformerConstant.MaxJumpHeight, 20)
    platformer.setConstant(mySprite, platformer.PlatformerConstant.MovementAcceleration, 120)
    platformer.loopFrames(
    mySprite,
    [img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . f . . f . . 
        `,img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . . . f . . 
        `,img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . f . . . 
        `,img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . f . . . . . 
        `,img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . f . . f . . 
        `],
    100,
    platformer.rule(platformer.PlatformerSpriteState.Moving, platformer.PlatformerSpriteState.FacingRight)
    )
    platformer.loopFrames(
    mySprite,
    [img`
        . . . . . . . . 
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f . . f . . 
        `,img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . f . . f . . 
        `],
    200,
    platformer.rule(platformer.PlatformerSpriteState.FacingRight)
    )
    platformer.loopFrames(
    mySprite,
    [img`
        . . . . . . . . 
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f . . f . . 
        `,img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . f . . f . . 
        `],
    200,
    platformer.rule(platformer.PlatformerSpriteState.FacingLeft)
    )
    platformer.loopFrames(
    mySprite,
    [img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . f . . f . . 
        `,img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . f . . . . . 
        `,img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . f . . . . 
        `,img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . . . f . . 
        `,img`
        . . . f f . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . . f f . . . 
        . . . . . . . . 
        . . f f f f . . 
        . . f f f f . . 
        . . f . . f . . 
        `],
    100,
    platformer.rule(platformer.PlatformerSpriteState.Moving, platformer.PlatformerSpriteState.FacingLeft)
    )
    platformer.moveSprite(mySprite, true)
    finailBoss = false
    notYourPortalGun = false
    orangeFizzled = false
    blueFizzled = false
    portalsEnabled = false
    turretsActive = false
    if (blockSettings.exists("Level")) {
        loadLevel(blockSettings.readNumber("Level"))
    } else {
        blockSettings.writeNumber("Volume", 100)
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber2`))
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        portalsEnabled = false
        holdingCube = false
        tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 13))
        screenOverlay = sprites.create(assets.image`Thumbnail`, SpriteKind.prop)
        screenOverlay.z = 5
        timer.after(5000, function () {
            sprites.destroy(screenOverlay)
            level = 1
            loadLevel(1)
        })
    }
    mecnisum1 = false
    mecnisum2 = false
    mecinuims3 = false
    if (level != 5) {
        for (let value of tiles.getTilesByType(assets.tile`myTile17`)) {
            laserSprite = sprites.create(img`
                2 2 
                2 2 
                2 2 
                2 2 
                2 2 
                2 2 
                2 2 
                2 2 
                `, SpriteKind.laser)
            tiles.setTileAt(value, assets.tile`transparency8`)
            tiles.placeOnTile(laserSprite, value)
        }
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile68`)) {
        laserSprite = sprites.create(img`
            2 2 
            2 2 
            2 2 
            2 2 
            2 2 
            2 2 
            2 2 
            2 2 
            `, SpriteKind.laser)
        tiles.setTileAt(value, assets.tile`myTile45`)
        tiles.placeOnTile(laserSprite, value)
    }
    for (let value of tiles.getTilesByType(assets.tile`myTile18`)) {
        laserSprite = sprites.create(img`
            2 2 2 2 2 2 2 2 
            2 2 2 2 2 2 2 2 
            `, SpriteKind.laser)
        tiles.setTileAt(value, assets.tile`transparency8`)
        tiles.placeOnTile(laserSprite, value)
    }
}
music.setVolume(blockSettings.readNumber("Volume"))
game.setDialogCursor(assets.image`BigTurret`)
game.setGameOverEffect(true, effects.splatter)
game.onUpdate(function () {
    tickMecnisums()
    doPortalUpdate(true)
    doPortalUpdate(false)
    mecnisum1 = false
    mecnisum2 = false
    mecinuims3 = false
    if (0 > distanceInsidePortal) {
        platformer.setConstant(mySprite, platformer.PlatformerConstant.MaxJumpHeight, 20)
    } else {
        platformer.setConstant(mySprite, platformer.PlatformerConstant.MaxJumpHeight, 0)
    }
    if (finailBoss) {
        if (mySprite.x > 75) {
            GLaDOSSprite.setImage(img`
                bffbbbbbbcccbbbb5fbbf.............................
                fbbfccbfcbbbccbbfcccbf............................
                ccbbfcfbbcccbbcbffcff.............................
                fccffcfbb2bbcbcfbbfc55............................
                fff5cfcfbbbbbcbccbbfbb............................
                fc55cfffb2b3bcbfccbbffb...........................
                cc55fffccfcbbbcbfcffccffb.........................
                ccffbbfcc3c2bbffffffbbccfb........................
                cfccbbfffcccffcbfcbbbffffff.......................
                cffccbffbffffcccfcbffbfbbbbf......................
                ccfcff5bbbffbfcfcbfccfbfbbfbf.....................
                fccfc555bfccbbffccfcffbbbbbbf.....................
                .fcccc555ffcccbbfcbfecfb2bbbbf....................
                .fcccccfffbffcccfcbffcfbbbfbff....................
                ..fcccfccb9bbfffffccfcfffb2b3f....................
                ...fcccffcbbbfcf11ffffffbbbbbff..ffffffff.........
                ....fffccfccfcf11f11fcbbfffffccff111111f1f........
                ....ff1ffcffcff11111fccbfcccffcfbf111111f1f.......
                ....fb111fffffb11111fcccffff11ffbf1f111111f.......
                ....fbf11111fb11111fcccfbf11ff1fbf1111ffffff......
                .....fbb1111fb11f11fcffbf1ffcffcffffff11111f......
                .....fbbf1f1fbff11ffbbfbf1ffcfccfbf11111111f......
                .....fffb111ffbbbffcbbbf1fccffcbfbf111111111f.....
                ......fbffff11fffbfccbbf1fcffccfffbf11ffff11f.....
                ......fbb111111bbbfccccbfbfcfcbfcfbf11fccf11f.....
                .......fbbbbb111bbbfffccfbfffcfccfbf11ffff11f.....
                ........fffbbbbbbffff.ffffbbfbfcffbf11fcff11f.....
                ...........ffffff.........fffcfcffbf11ff5f11f.....
                ............................fcbfcfbf11f55f11f.....
                .............................fcfffbf11fccf11f.....
                .............................ffcfbf11ffff111f.....
                ...............................cfbf11fccf11f......
                ...............................fbfb11ffff11f......
                ...............................fbfb1111111f.......
                ...............................fbfbb111ffbf.......
                ................................fbbbbbbfbf........
                .................................ffffffff.........
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                `)
            GLaDOSSprite.x = 92
        } else {
            GLaDOSSprite.setImage(img`
                ........................fbbf5bbbbcccbbbbbbffb.....
                .......................fbcccfbbccbbbcfbccfbbf.....
                ........................ffcffbcbbcccbbfcfbbcc.....
                .......................55cfbbfcbcbb2bbfcffccf.....
                .......................bbfbbccbcbbbbbfcfc5fff.....
                ......................bffbbccfbcb3b2bfffc55cf.....
                ....................bffccffcfbcbbbcfccfff55cc.....
                ...................bfccbbffffffbb2c3ccfbbffcc.....
                ..................ffffffbbbcfbcffcccfffbbccfc.....
                .................fbbbbfbffbcfcccffffbffbccffc.....
                ................fbfbbfbfccfbcfcfbffbbb5ffcfcc.....
                ................fbbbbbbffcfccffbbccfb555cfccf.....
                ...............fbbbb2bfcefbcfbbcccff555ccccf......
                ...............ffbfbbbfcffbcfcccffbfffcccccf......
                ...............f3b2bfffcfccfffffbb9bccfcccf.......
                ....ffffffff..ffbbbbbffffff11fcfbbbcffcccf........
                ...f1f111111ffccfffffbbcf11f11fcfccfccfff.........
                ..f1f111111fbfcffcccfbccf11111ffcffcff1ff.........
                ..f111111f1fbff11ffffcccf11111bfffff111bf.........
                .ffffff1111fbf1ff11fbfcccf11111bf11111fbf.........
                .f11111ffffffcffcff1fbffcf11f11bf1111bbf..........
                .f11111111fbfccfcff1fbfbbff11ffbf1f1fbbf..........
                f111111111fbfbcffccf1fbbbcffbbbff111bfff..........
                f11ffff11fbfffccffcf1fbbccfbfff11ffffbf...........
                f11fccf11fbfcfbcfcfbfbccccfbbb111111bbf...........
                f11ffff11fbfccfcfffbfccfffbbb111bbbbbf............
                f11ffcf11fbffcfbfbbffff.ffffbbbbbbfff.............
                f11f5ff11fbffcfcfff.........ffffff................
                f11f55f11fbfcfbcf.................................
                f11fccf11fbfffcf..................................
                f111ffff11fbfcff..................................
                .f11fccf11fbfc....................................
                .f11ffff11bfbf....................................
                ..f1111111bfbf....................................
                ..fbff111bbfbf....................................
                ...fbfbbbbbbf.....................................
                ....ffffffff......................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                ..................................................
                `)
            GLaDOSSprite.x = 70
        }
    }
    if (holdingCore) {
        coreSprite.x = mySprite.x
        coreSprite.y = mySprite.y - 9
    }
    if (phase > 1) {
        if (mySprite.x > bigTurretSprite.x) {
            bigTurretSprite.setImage(img`
                .................
                .................
                .................
                .................
                .................
                .................
                .................
                .................
                .................
                .................
                ......ff.........
                ....ffc1ff.......
                ....f11c1f.......
                ...fb11c11f......
                ..f11b1c11f......
                ..f11b1c11bf.....
                ..f1b111c11f.....
                ..f1b112f21f.....
                ..ff1b1f221f.....
                ..fb1b12f21f.....
                .fbc1b11c11f.....
                .fbb1b11c11f.....
                .fcffb11c1f......
                .fcff1bbbbf......
                .fcf111ccfffff...
                fcf1111cfc1111f..
                fcf1c1cf.fc11cf..
                fcf1fff...ffffcf.
                .ffcf.........fcf
                ..fcf.........fcf
                ..fcf.........fcf
                ...f...........f.
                `)
        } else {
            bigTurretSprite.setImage(img`
                .................
                .................
                .................
                .................
                .................
                .................
                .................
                .................
                .................
                .................
                .........ff......
                .......ff1cff....
                .......f1c11f....
                ......f11c11bf...
                ......f11c1b11f..
                .....fb11c1b11f..
                .....f11c111b1f..
                .....f12f211b1f..
                .....f122f1b1ff..
                .....f12f21b1bf..
                .....f11c11b1cbf.
                .....f11c11b1bbf.
                ......f1c11bffcf.
                ......fbbbb1ffcf.
                ...fffffcc111fcf.
                ..f1111cfc1111fcf
                ..fc11cf.fc1c1fcf
                .fcffff...fff1fcf
                fcf.........fcff.
                fcf.........fcf..
                fcf.........fcf..
                .f...........f...
                `)
        }
    }
})
game.onUpdateInterval(5000, function () {
    if (notYourPortalGun) {
        portalGunSprite.setImage(img`
            .fffff...................
            ......f..................
            .......f........fff......
            ..ffffcfcf.....f331ff....
            ..ffffffcf44333f11111ff..
            .cfffbb11f43333f1111111ff
            ccffbb111f......fb111111f
            .cfbb1111f......fbb11111f
            ..bb111111fffffffbbb1111f
            ..bbbb111ffffffffbbbb11ff
            ..fffffff.......fffffff..
            .......f.................
            ......f..................
            .fffff...................
            .........................
            .........................
            `)
        projectile = sprites.create(img`
            4 4 
            4 4 
            `, SpriteKind.OrangePortalShot)
        tiles.placeOnTile(projectile, tiles.getTileLocation(8, 13))
        if (gunFacingDirection == 0) {
            projectile.vx = -200
            gunFacingDirection += 1
        } else if (gunFacingDirection == 1) {
            portalGunSprite.setImage(img`
                .......c........
                .f....ccc.....f.
                .f..fffffbbf..f.
                .f..ffffbbbf..f.
                .f..fffbb1bf..f.
                .f..ffbb11bf..f.
                ..f.cfb1111f.f..
                ...fff11111ff...
                ....cc11111f....
                ....fffff1f.....
                .....44..ff.....
                .....43..ff.....
                .....33..ff.....
                .....33..ff.....
                .....33..ff.....
                ....fff..ff.....
                ...f311fffff....
                ...f311bbbbf....
                ...f1111bbbf....
                ....f1111bbf....
                ....f11111bf....
                .....f11111f....
                .....f11111f....
                ......f111f.....
                ......fffff.....
                `)
            projectile.vy = -200
            gunFacingDirection += 1
        } else {
            portalGunSprite.setImage(assets.image`myImage`)
            projectile.vx = 200
            gunFacingDirection = 0
        }
    }
})
game.onUpdateInterval(50, function () {
    platformer.setFeatureEnabled(platformer.PlatformerFeatures.WallJumps, false)
})
game.onUpdateInterval(7000, function () {
    if (phase > 1) {
        music.play(music.melodyPlayable(music.sonar), music.PlaybackMode.InBackground)
        timer.after(1000, function () {
            bulletSprite = sprites.create(img`
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                . . . . . . . . . . . . . . . . 
                `, SpriteKind.rocket)
            music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
            bulletSprite.setPosition(bigTurretSprite.x, bigTurretSprite.x)
            bulletSprite.setFlag(SpriteFlag.DestroyOnWall, true)
            if (mySprite.x > bigTurretSprite.x) {
                animation.runImageAnimation(
                bulletSprite,
                [img`
                    . . 6 6 . . . . . 
                    . . . 6 . . . . . 
                    . 9 9 6 6 8 6 6 . 
                    9 8 8 8 6 8 6 6 6 
                    . 9 9 6 6 8 6 6 . 
                    . . . 6 . . . . . 
                    . . 6 6 . . . . . 
                    `,img`
                    . . 6 6 . . . . . 
                    . . . 6 . . . . . 
                    . . 9 6 6 8 6 6 . 
                    . 9 8 8 6 8 6 6 6 
                    . . 9 6 6 8 6 6 . 
                    . . . 6 . . . . . 
                    . . 6 6 . . . . . 
                    `],
                100,
                true
                )
            } else {
                animation.runImageAnimation(
                bulletSprite,
                [img`
                    . . . . . 6 6 . . 
                    . . . . . 6 . . . 
                    . 6 6 8 6 6 9 . . 
                    6 6 6 8 6 8 8 9 . 
                    . 6 6 8 6 6 9 . . 
                    . . . . . 6 . . . 
                    . . . . . 6 6 . . 
                    `,img`
                    . . . . . 6 6 . . 
                    . . . . . 6 . . . 
                    . 6 6 8 6 6 9 9 . 
                    6 6 6 8 6 8 8 8 9 
                    . 6 6 8 6 6 9 9 . 
                    . . . . . 6 . . . 
                    . . . . . 6 6 . . 
                    `],
                100,
                true
                )
            }
            spriteutils.setVelocityAtAngle(bulletSprite, spriteutils.angleFrom(bulletSprite, mySprite), 50)
        })
    }
    if (phase == 2) {
        timer.after(10, function () {
            if (randint(1, 2) == 1) {
                story.spriteSayText(GLaDOSSprite, "I suggest, you lay down in front of a rocket, it's less painful than the neurotoxin", 2, 1, story.TextSpeed.Fast)
            } else if (randint(1, 2) == 2) {
                story.spriteSayText(GLaDOSSprite, "(Mocking) *Cough* Neurotoxin... so deadly. Just Kidding", 2, 1, story.TextSpeed.Fast)
            } else {
            	
            }
        })
    }
})
game.onUpdateInterval(80, function () {
    if (holdingCube && holdingGreen) {
        holdingGreen = false
        summonGreenCube(mySprite.tilemapLocation().column, mySprite.tilemapLocation().row)
    }
})
game.onUpdateInterval(1000, function () {
    if (!(blockSettings.exists("Menu"))) {
        blockSettings.writeNumber("Time", blockSettings.readNumber("Time") + 1)
    }
})
game.onUpdateInterval(100, function () {
    if (turretsActive) {
        if (sight.isInSightCone(
        turretSprite,
        mySprite,
        80,
        180,
        80
        ) && !(spriteutils.isDestroyed(turretSprite))) {
            music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
            bulletSprite = sprites.create(img`
                . 5 5 3 5 
                5 5 5 3 5 
                . 5 5 3 5 
                `, SpriteKind.bullet)
            bulletSprite.setFlag(SpriteFlag.DestroyOnWall, true)
            bulletSprite.setPosition(turretSprite.x, turretSprite.y)
            spriteutils.setVelocityAtAngle(bulletSprite, spriteutils.angleFrom(bulletSprite, mySprite), 100)
        }
        if (sight.isInSightCone(
        turretTwo,
        mySprite,
        80,
        0,
        300
        ) && !(spriteutils.isDestroyed(turretTwo))) {
            music.play(music.melodyPlayable(music.pewPew), music.PlaybackMode.InBackground)
            bulletSprite = sprites.create(img`
                5 3 5 5 . 
                5 3 5 5 5 
                5 3 5 5 . 
                `, SpriteKind.bullet)
            bulletSprite.setFlag(SpriteFlag.DestroyOnWall, true)
            bulletSprite.setPosition(turretTwo.x, turretTwo.y)
            spriteutils.setVelocityAtAngle(bulletSprite, spriteutils.angleFrom(bulletSprite, mySprite), 100)
        }
    }
})
