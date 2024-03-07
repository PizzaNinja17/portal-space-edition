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
    export const robotController = SpriteKind.create()
}
scene.onOverlapTile(SpriteKind.robotController, assets.tile`myTile1`, function (sprite, location) {
    radioFound = true
    tiles.setTileAt(location, assets.tile`transparency8`)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile1`, function (sprite, location) {
    radioFound = true
    tiles.setTileAt(location, assets.tile`transparency8`)
})
function setInPortal (blue: boolean, value: boolean) {
    if (blue) {
        inBluePortal = value
    } else {
        inOrangePortal = value
    }
}
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile72`, function (sprite, location) {
    if (controller.down.isPressed()) {
        music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.InBackground)
        tiles.setTileAt(location, assets.tile`myTile73`)
        timer.after(5000, function () {
            platformer.moveSprite(mySprite, false)
            scene.cameraShake(2, 500)
            music.play(music.melodyPlayable(music.spooky), music.PlaybackMode.InBackground)
            timer.after(100, function () {
                compainionRobotControl = true
                controller.moveSprite(compainionRobot, 40, 0)
                mySprite.vx = 0
            })
        })
    }
})
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
    scene.cameraShake(6, 5000)
    platformer.setGravity(1, platformer.Direction.Up)
    GLaDOSSprite.startEffect(effects.spray)
    timer.after(10, function () {
        story.spriteSayText(GLaDOSSprite, "YOU WILL REGRET THI-*Static*", 2, 1)
        color.startFade(color.originalPalette, color.White, 5000)
        timer.after(5000, function () {
            blockSettings.writeNumber("Level", 22)
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
    if (level > 21) {
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
    game.showLongText("Your current time is " + convertToText(blockSettings.readNumber("Time")), DialogLayout.Bottom)
    story.showPlayerChoices("Resume", "Volume Up", "Volume Down", "Reset Entire Game")
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
    } else if (story.checkLastAnswer("Reset Entire Game")) {
        blockSettings.clear()
        game.reset()
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
    if (radioFound) {
        blockSettings.writeNumber("Time", blockSettings.readNumber("Time") - 30)
    }
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
scene.onOverlapTile(SpriteKind.robotController, assets.tile`myTile5`, function (sprite, location) {
    if (sprite.isHittingTile(CollisionDirection.Bottom)) {
        mecnisum2 = true
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
        story.printText("Welcome to a special test", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("You will have a compainon-bot", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("To take control of the bot press the button, in this situation you will not be able to move", 75, 30, 9, 1, story.TextSpeed.Normal)
        story.printText("You will still be able to shoot portals in this state", 75, 30, 9, 1, story.TextSpeed.Normal)
        robotControl()
        story.printText("Help your companion rescue the weighted storage cube", 75, 30, 9, 1, story.TextSpeed.Normal)
        portalsEnabled = true
        summonCube(8, 8)
        level = 13
        tiles.setTileAt(tiles.getTileLocation(4, 12), assets.tile`myTile10`)
        tiles.setWallAt(tiles.getTileLocation(4, 12), false)
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
    if (num == 22) {
        music.setVolume(20)
        level = 22
        music.play(music.createSong(hex`0078000408040500001c00010a006400f4016400000400000000000000000000000000050000048b0004000800010a08000c0001120c001000010f14001800011218001c0001081c002000011420002400010524002c00010f2c003000010f30003400011234003800010838003c00011640004800010f48004c0001164c005000010850005400010f5400580001125c006000010f60006400010d64006800010c7000740002051178007c00010c7c008000010d01001c000f05001202c102c20100040500280000006400280003140006020004910000000c0001270c001000011d10001400012014001c0001241c002000012220002400011924002800012728002c0001242c00300002192a30003400012438003c0001243c004000012244004800011d48004c0001295000540001245400580001205c006000012964006800012468006c0001276c007000012270007400011974007800012078007c0001277c008000011906001c00010a006400f40164000004000000000000000000000000000000000237000c00100001081400180001291c002000020d1b24002800010634003800010f40004400010844004800012558005c0001246c007000010f07001c00020a006400f401640000040000000000000000000000000000000003360014001800011924002800012a30003400011b3c00400001294c005000012458005c00011b64006800011e70007400012974008000011b09010e02026400000403780000040a000301000000640001c80000040100000000640001640000040100000000fa0004af00000401c80000040a00019600000414000501006400140005010000002c0104dc00000401fa0000040a0001c8000004140005d0076400140005d0070000c800029001f40105c201f4010a0005900114001400039001000005c201f4010500058403050032000584030000fa00049001000005c201f4010500058403c80032000584030500640005840300009001049001000005c201f4010500058403c80064000584030500c8000584030000f40105ac0d000404a00f00000a0004ac0d2003010004a00f0000280004ac0d9001010004a00f0000280002d00700040408070f0064000408070000c80003c800c8000e7d00c80019000e64000f0032000e78000000fa00032c01c8000ee100c80019000ec8000f0032000edc000000fa0003f401c8000ea901c80019000e90010f0032000ea4010000fa0001c8000004014b000000c800012c01000401c8000000c8000190010004012c010000c80002c800000404c8000f0064000496000000c80002c2010004045e010f006400042c010000640002c409000404c4096400960004f6090000f40102b80b000404b80b64002c0104f40b0000f401022003000004200300040a000420030000ea01029001000004900100040a000490010000900102d007000410d0076400960010d0070000c8001e000c000d000103100011000106200021000108280029000108300031000108`), music.PlaybackMode.LoopingInBackground)
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
            7777777777777777777777777777777777777777777777777777777777779999977777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777996c9997777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777967777997777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777769977777696777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777c9777777769777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777699777777769777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777b1111177779977777777697b111111777b111111117777b111777777b1117777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777b1111117779977777777c97b111111177bccc11ccc7777b111b77777b1117777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777b1177117769677777777797b11b771177777b11777777b1111177777b1117777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777b1177117799777777777797b11b771177777b11777777b1171177777b1117777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777b1111117799777777777c97b111111177777b11777777b11f1117777b1117777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777b1111177799777777777697b11111b777777b1177777b11111117777b1117777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777b1177777799777777777997b11b11c777777b1177777b1111111c777b1117777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777b11777777997777777779c7b11b711777777b117777b111777111777b111111b777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777b1177777799777777776977c11b711177777b117777b111777111777b111111b777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777cbb77777799777777779677ccbc771b77777bcb7777bcbc7777bbc77bcbbbbbc777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777769777777799c7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777967777769c77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777699996996c77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777799999967777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777779999c77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777711177177711771111771771111711111777771711777171717771177711777771711771111177777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777717177177711771771171777717777717777711711177171711771177711777711771777777177777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777717177177711771777171777717777117777711717177171711171177711777111771777771777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777711117117711771771171777117771177777111717117171717171177711771171771777711777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777717717711111771111771771177771777771171717711171717711177711771771771777117777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777717717771111771777771771177711777771771717777171717711177117711771771777177777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777711117777117771777771711111711111171771717777171717771171117717771711171177777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777117777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777177777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777b77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777fff7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777fbbaf777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777faabf777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777fbbaf777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777faabf777777777777777777777777777777774777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777fbbbf777777777777777777777777777777745477777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777f51515f77777777777777777777777777777745477777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777f5515155f7777777777777777777777777777455547777777777777777777777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777777f555151555f77777777777777777777777777745554777777777cccbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777777f551555155f77777777777777777777777777455555477777777cccbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc777777777777777777777777777777777f55515151555f7777777777777777777777777455555477777777cccbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc777777777777777777777777777777777f55551515555f7777777777777777777777774555555547777777cccbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc777777777777777777777777777777777f55555555555f7777777777777777777777774555555547777777cccbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc777777777777777777777777777777777f55555555555f7777777777777777777777733333333333777777cccbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777777f555555555f7777777777777777777fffffffffffffffffffffffffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777777f555555555f7777777777777777777fffffffffffffffffffffffffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc77777777777777777777777777777777777f5555555f77777777777777777777fffffffffffffffffffffffffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc777777777777777777777777777777777777fffffff777777777777777777777fffffffffffffffffffffffffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777777777777777777777777777777777777ffffbbb111bbbbbb111bbbfffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777777777777777777777777777777777777ffffbbb111bbbbbb111bbbfffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777777777722277777777777777777777777ffffbbb111bbbbbb111bbbfffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777777777211427777777777777777777777ffff111eee111111eee111fffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777777777214424444444477777777777777ffff111eee111111eee111fffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777777744244424444444477777777777777ffff111eee111111eee111fffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777744444422244444444477777777777777ffffeeeeeeeeeeeeeeeeeefffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777777444444444444444444477777777777777ffffeeeeeeeeeeeeeeeeeefffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc777777777777777777777777777777444444444444444441b477777777777777ffffeeeeeeeeeeeeeeeeeefffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777773aaaaa4444444441bb1377777777777777ffffeeeeeeeeeeeeeeeeeefffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777773aaaaaaaa33331bb111377777777777777ffffeeeeeeeeeeeeeeeeeefffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc77777777777777777777777777777a3bbbbbbbb3311b111133a7777777777777ffffeeeeeeeeeeeeeeeeeefffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777713aaaaaaaa31bb11133131a777777777777ffffeeeeeeeeeeeeeeeeeefffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777713aaaaaaaa3b1113311131a777777777777ffff111eeeeeeeeeeee111fffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777713bbbbbbbb311131111b311a77777777777ffff111eeeeeeeeeeee111fffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777713aaaaaaaa3133111bb1311a77777777777ffff111eeeeeeeeeeee111fffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777713aaaaaaaa33111bb111311a77777777777ffffbbb111eeeeee111bbbfffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777713bbbbbbbb3111b11333111a77777777777ffffbbb111eeeeee111bbbfffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc7777777777777777777777777777711333aaaaa31bb13311111a777777777777ffffbbb111eeeeee111bbbfffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbcccc777777777777777777777777777771111133aaa3b1331111111a777777777777fffffffffffffffffffffffffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaacc7777a11111133333311111aaaa7777777777777fffffffffffffffffffffffffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbaaaaaaaaaaaaaaaaaaaaaaaaaaacc7777baaa11111111111aaabbb77777777777777fffffffffffffffffffffffffbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcc7777bbbbaaaaaaaaaaabbbbbb7777777777ccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbcc7777bbbbbbbbbbbbbbbbbbbbb7777777777ccbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbcccc77777777777777777777bbbbcc7777b777777777777777777cb7777777777ccbbbb77777777777777777777ccccbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbcccc77777777777777777777bbbbcc7777b777777777777777777cb7777777777ccbbbb77777777777777777777ccccbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbcccc77777777777777777777bbbbcc7777b777777777777777777cb7777777777ccbbbb77777777777777777777ccccbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbcccc77777777777777777777bbbbcc7777b777777777777777777cb7777777777ccbbbb77777777777777777777ccccbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbcccc77777777777777777777bbbbcc7777b777777777777777777cb7777777777ccbbbb77777777777777777777ccccbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbcccc77777777777777777777bbbbcc7777b777777777777777777cb7777777777ccbbbb77777777777777777777ccccbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbcccc77777777777777777777bbbbcc7777b777777777777777777cb7777777777ccbbbb77777777777777777777ccccbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbcccc77777777777777777777bbbbcc7777b777777777777777777cb7777777777ccbbbb77777777777777777777ccccbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbcccc77777777777777777777bbbbcc7777b777777777777777777cb7777777777ccbbbb77777777777777777777ccccbbbb77777777777777777777777777777777777
            7777777777777777777777bbbbcccc77777777777777777777bbbbcc7777b777777777777777777cb7777777777ccbbbb77777777777777777777ccccbbbb77777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777b777777777777777777cb7777777777777777777777777777777777777777777777777777777777777777777777777777777
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
            7777777777777777777777777777777777777777777777777777777771117117711171177177177777177711777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777771777171717771717771117771117177177777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777771777117711771717177177777177177177777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777177717171777171717717777717717717777777777777777777777777777777777c611117777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777771117171711171177177177777177711777777777777777777777777777777777777119911997777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777771199999199977777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777761999999119977777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777711999999919999777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777719999999991997777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777619969999991999777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777199969699999199777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777199966699999199977777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777196966666999919977777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c196966666966919997777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777778196666666666619997777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b196666686666691997777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777776196666686666691999777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777776196666686666691999777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777bbbbbb777777777777777776196666688666661999977777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777bbbbbbbbbb77777777777777771199666688686669199977777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777bbbbbbbbbbbb777777777777776196666688888669199977777777777777777777
            77777777777777777777777777777e77e7777777777777777777777777777777777777777777777777777777777777bbbbbbbbbbbb777777777777776996666688888666199977777777777777777777
            7777777777777777777777777777551111e777777777777777777771177171117177777117711771177777777777ccccccccccccccc77777777777776996666688888666199977777777777777777777
            77777777777777777777777777755155551e7777777777777777777171777177717777177171717171777777777ccccc66666666ccc77777777777776196666688888666999977777777777777777777
            777777777777777777777777775515555554777777777777777777711771717771117711117117717177777777777666665566666cccc777777777777196666688888666969977777777777777777777
            7777777777777777777777777755155555555777777777777777777171717177717717177171717171777777777776666517566666777777777777778196666888888666919977777777777777777777
            777777777777777777777777755155555555147777777777777777717171711171771717717171711777777777777666657756666677777777777777c199666888888866919977777777777777777777
            777777777777777777777777755155554445517777777777777777777777777777777777777777777777777777777666665566666677777777777777c199666888888866619977777777777777777777
            7777777777777777777777777551555445555547777777777777777777777777777777777777777777777777777ff6666666666666777777777777777199668888888866619977777777777777777777
            777777777777777777777777754555544444551777777777777777117717717777777777777777777777777777fbf6666666666666777777777777777999668888888866619977777777777777777777
            777777777777777777777777751555444444451e777777777777717717117177777777777777777777777777777ff666666666666677777777777777c199668888888866619977777777777777777777
            7777777777777777777777777515544444444551777777777777717717171177777777777777777777777777777666666666666666777777777777777196688888888866619977777777777777777777
            777777777777777777777777751444443333455177777777777777117717717777777777777777777777777777766666e66666e666777777777777777b69988888888866619977777777777777777777
            77777777777777777777777775144444333335514c7777777777777777777777777777777777777777777777777766666666e66666777777777777777719668888888866699977777777777777777777
            777777777777777777777777751444443333345517777777777777777777777777777777777777777777777777776e66e6e6e6e666777777777777777769988888888866999977777777777777777777
            7777777777777777777777777514444433333455177777777777711777117717717771117111771177117711177766e6e666eeee88887777777777777799966888888666999977777777777777777777
            77777777777777777777777775154444333333551e7777777777717171717171717171777177717717171717777788e6eeeeeeee88887777777777777769966888888666699777777777777777777777
            7777777777777777777777777554444233333445547777777777717171717111711771177177717717171711777888eeeeeeeeea88887777777777777781998888886666919777777777777777777777
            7777777777777777777777775555444333333445557777777777717717717171717171777177717717171717777888eeedddaaaaa8887777777777777771996888886666619777777777777777777777
            77777777777777777777777755554433333333355477777777777177777171717171711171117711771177111788888adddddaaaa8888777777777777771996888886666619777777777777777777777
            77777777777777777777777755544433333333445177777777777777777777777777777777777777777777777788888adddddaaaa88887777777777777c8199888886666619777777777777777777777
            777777777777777777777777551444333333333554b7777777777777777777777777777777777777777777777788888adddddaaaa8888777777777777777199688886666619777777777777777777777
            77777777777777777777777755144433333333344517777777777777777777777711177117711771771717771788888acdddcaaaa8888777777777777777199666666669919777777777777777777777
            7777777777777777777777775514443333333344551c7777777777777777777777177717717171717717117117888888cccccaaa88887777777777777777819666666699919777777777777777777777
            777777777777777777777777551444333333334455577777777777777777777777117717717117717717171717888888dddddaaa88887777777777777777719966666999969777777777777777777777
            777777777777777777777777551444333333334e55177777777777777777777777177771177171771177177717788888cccccaa888887777777777777777769999966999199777777777777777777777
            77777777777777777777777755144433333334ee551c7777777777777777777777777777777777777777777777778888ddddda8888877777777777777777771996669999199777777777777777777777
            77777777777777777777777755154433333334e4551c7777777777777777777777777777777777777777777777777888ccccc88887777777777777777777776199999999199777777777777777777777
            77777777777777777777777755154443333334e4451e7777777777777777777777777777777777777777777777777778ddddd88777777777777777777777777999999991997777777777777777777777
            77777777777777777777777755454443333344e4451777777777777777777777777777777777777777777777777777777777777777777777777777777777777769999991997777777777777777777777
            77777777777777777777777755554443333344e4451477777777777777777777777777777777777777777777777777777777777777777777777777777777777781999919977777777777777777777777
            77777777777777777777777755514443333344e4455477777777777777777777777777777777777777777777777777777777777777777777777777777777777778111199777777777777777777777777
            77777777777777777777777755514443333344e4455477777777711177117711177799977799779977999779779777777777777777777777777777777777777777787787777777777777777777777777
            7777777777777777777777775551544333334444451477777777717771771717717797797977979797797797979777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777755515444343344e4551177777777711771771711177799977977979977797799979777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777755551444443344e4451477777777717771771711777797777977979797797797979777111771177117711177777777777777777777777777777777777777777777777777
            77777777777777777777777775551544444344e4451477777777717777117717177797777799779797797797979997177717717171717777777777777777777777777777777777777777777777777777
            77777777777777777777777775551544444344e4451477777777777777777777777777777777777777777777777777177717717171711777777777777777777777777777777777777777777777777777
            77777777777777777777777777551544444344e4451b77777777777777777777777777777777777337737737377377177717717171717777777777777777777777777777777777777777777777777777
            7777777777777777777777777755514444444444451e77777777777777777777777777777777773777737737337377111771177117711177777777777777777777777777777777777777777777777777
            7777777777777777777777777755515445444445451c77777777777777777777777777777777773733737737373377777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777775515555444445451777777777777777777777777777777777773773737737377377777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777775551555554445551777777777777777777777777777777777777337773377377377777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777551555554545551777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777555155555545514777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777755155555555517777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777555515555555117777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777775511555555147777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777775551555551177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777755115511777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777711114c77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cceeeecc777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c777777c777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c1111c7777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777771bbbb17777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777711beeb11777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777711beeb11777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777771bbbb17777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c1111c7777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c777777c777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cceeeecc777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777cc4444cc77777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c777777c77777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c1111c777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777771bbbb1777777777777777777777777777777777777777777777777
            777777777777777777777777ff777777777777777777777777777777777777777777777777777777777777777777777777777777711b22b1177777777777777777777777777777777777777777777777
            7777777777777777777777ffc1ff7777777777777777777777777777777777777777777777777777777777777777777777777777711b22b1177777777777777777777777777777777777777777777777
            7777777777777777777777f11c1f7777777777777777777777777777777777777777777777777777777777777777777777777777771bbbb1777777777777777777777777777777777777777777777777
            777777777777777777777fb11c11f77777777777777777777777777777777777777777777777777777777777777777777777777777c1111c777777777777777777777777777777777777777777777777
            77777777777777777777f11b1c11f7777777777777777777777777777777777777777777777777777777777777777777777777777c777777c77777777777777777777777777777777777777777777777
            77777777777777777777f11b1c11bf777777777777777777777777777777777777777777777777777777777777777777777777777cc4444cc77777777777777777777777777777777777777777777777
            77777777777777777777f1b111c11f7777777777777777777777777777777777777777777777777ffffffffffffffff77777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777f1b112f21f7777777777777777777777777777777777777777777777777ffffffffffffffff77777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777ff1b1f22222222222222222222222222222222222222222222222222222ffbb11bbbb11bbff77777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777fb1b12f21f7777777777777777777777777777777777777777777777777ffbb11bbbb11bbff77777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777fbc1b11c11f7777777777777777777777777777777777777777777777777ff119999999911ff77777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777fbb1b11c11f7777777777777777777777777777777777777777777777777ff119999999911ff77777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777fcffb11c1f77777777777777777777777777777777777777777777777777ffbb99aaaa99bbff77777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777fcff1bbbbf77777777777777777777777777777777777777777777777777ffbb99aaaa99bbff77777777777777777777777777777777777cc6666cc7777777777777777777777
            7777777777777777777fcf111ccfffff77777777777777777777777777777777777777777777777ffbb99aaaa99bbff77777777777777777777777777777777777c777777c7777777777777777777777
            777777777777777777fcf1111cfc1111f7777777777777777777777777777777777777777777777ffbb99aaaa99bbff777777777777777777777777777777777777c1111c77777777777777777777777
            777777777777777777fcf1c1cf7fc11cf7777777777777777777777777777777777777777777777ff119999999911ff7777777777777777777777777777777777771bbbb177777777777777777777777
            777777777777777777fcf1fff777ffffcf777777777777777777777777777777777777777777777ff119999999911ff7777777777777777777777777777777777711b99b117777777777777777777777
            7777777777777777777ffcf777777777fcf77777777777777777777777777777777777777777777ffbb11bbbb11bbff7777777777777777777777777777777777711b99b117777777777777777777777
            77777777777777777777fcf777777777fcf77777777777777777777777777777777777777777777ffbb11bbbb11bbff7777777777777777777777777777777777771bbbb177777777777777777777777
            77777777777777777777fcf777777777fcf77777777777777777777777777777777777777777777ffffffffffffffff777777777777777777777777777777777777c1111c77777777777777777777777
            777777777777777777777f77777777777f777777777777777777777777777777777777777777777ffffffffffffffff77777777777777777777777777777777777c777777c7777777777777777777777
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb77777777777777777777777cc6666cc7777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b11111111111b11111111111b77777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b11111111111b11111111111b77777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b11111111111b11111111111b77777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b11111111111b11111111111b77777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b11111111111b11111111111b77777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b11111111111b11111111111b77777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b11111111111b11111111111b77777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b11111111111b11111111111b77777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b11111111111b11111111111b77777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b11111111111b11111111111b77777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b11111111111b11111111111b77777777777777777777777777777777777777777777777777777
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb77777777777777777777777777777777777777777777777777777
            bbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb77777777777777777777777777777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b77777777777777777777777777777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b77777777777777777777777777777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b77777777777777777777777777777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b77777777777777777777777777777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b77777777777777777777777777777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b77777777777777777777777777777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b77777777777777777777777777777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b77777777777777777777777777777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b77777777777777777777777777777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b77777777777777777777777777777777777777777777777777777777777777777777777777777
            11111111111b11111111111b11111111111b11111111111b11111111111b1111111111b11111111111b77777777777777777777777777777777777777777777777777777777777777777777777777777
            fbbbbbbcccbbbb5fbbfbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbbb77777777777777777777777777777777777777777777777777777777777777777777777777777
            bfccbfcbbbccbbfcccbf77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            bbfcfbbcccbbcbffcff777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            cffcfbb2bbcbcfbbfc5577777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            f5cfcfbbbbbcbccbbfbb77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            55cfffb2b3bcbfccbbffb7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            55fffccfcbbbcbfcffccffb77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            ffbbfcc3c2bbffffffbbccfb7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            ccbbfffcccffcbfcbbbffffff777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            fccbffbffffcccfcbffbfbbbbf77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            fcff5bbbffbfcfcbfccfbfbbfbf7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            cfc555bfccbbffccfcffbbbbbbf7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            cccc555ffcccbbfcbfecfb2bbbbf777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            cccccfffbffcccfcbffcfbbbfbff77777777777777777777777777777777777777777bbcccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            fcccfccb9bbfffffccfcfffb2b3f77777777777777777777777777777777777777777bbc9c97777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7fcccffcbbbfcf11ffffffbbbbbff77ffffffff777777777777777777777777777777bbcccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77fffccfccfcf11f11fcbbfffffccff111111f1f7777777777777777777777777777777f7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77ff1ffcffcff11111fccbfcccffcfbf111111f1f7777777777777777777777777777bbbbbbb777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77fb111fffffb11111fcccffff11ffbf1f111111f7777777777777777777777777777bbbbbbb777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            77fbf11111fb11111fcccfbf11ff1fbf1111ffffff77777777777777777777777777cfcfcff7777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777fbb1111fb11f11fcffbf1ffcffcffffff11111f7777777777777777777777777ccccccccc777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777fbbf1f1fbff11ffbbfbf1ffcfccfbf11111111f7777777777777777777777777bbbbbbbbb777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777fffb111ffbbbffcbbbf1fccffcbfbf111111111f77777777777777777777777bacaacaacab77777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777fbffff11fffbfccbbf1fcffccfffbf11ffff11f777777777777777777777777bbbbbbbbb777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777fbb111111bbbfccccbfbfcfcbfcfbf11fccf11f77777777777777777777ffffffffffffffffffffffffffff777777777777777777777777777777777777777777777777777777777777777777777
            77777fbbbbb111bbbfffccfbfffcfccfbf11ffff11f777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777fffbbbbbbffff7ffffbbfbfcffbf11fcff11f777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777ffffff777777777fffcfcffbf11ff5f11f777777777777711771177111717717111717777711771771777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777fcbfcfbf11f55f11f777777777777177171717177771177177717777177171171777777777777777777777111111717777777777771117771117777777777777777777
            777777777777777777777777777fcfffbf11fccf11f777777777777111171177117771177177717777177171711777777777777777777777177777717777777111771771717771711111777777777777
            777777777777777777777777777ffcfbf11ffff111f777777777777177171717177771177177717777711771771777777777777777777777177777717777777777171771717771717777777777777777
            77777777777777777777777777777cfbf11fccf11f7777777777777177171717111717717111711177777777777777777777777777777777177777717777777111171771717771717777777777777777
            77777777777777777777777777777fbfb11ffff11f7777777777777777777777777777777777777777777777777777777777777777777777177111717777771777171771717771711117777777777777
            77777777777777777777777777777fbfb1111111f77777777777777777777777777777777777777777777777777777777777777777777777177771717777771777171771717771777717777777777777
            77777777777777777777777777777fbfbb111ffbf77777777777771177711771771777111711177117711771117777777777777777777777177771717777771777171771717771777717777777777777
            777777777777777777777777777777fbbbbbbfbf777777777777771717171717171717177717771771717171777777777777777777777777111111711111177111171117771117711117777777777777
            7777777777777777777777777777777ffffffff7777777777777771717171711171177117717771771717171177777711111111111117777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777771771771717171717177717771771717171777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777771777771717171717111711177117711771117777777777777777777777777711711177117717717711117777777777777777777777
            7777777777777777777777777777777777777177777777777777777777777777777777777777777777777777777777777777777777777777777177717717171777111717777777777777777777777777
            7777777777777777777777777777777777771117777777777777777777777777777777777777777777777777777777777777777777777777777711711177117717717711777777777777777777777777
            7777777777777777777777777777777777771117777777777777777777777777777111771177117717717177717777777777777777777777777771717777171717717717777777777777777777777777
            7777777777777777777777777777777777711111777777777777777777777777777177717717171717717117117777777777777777777777777111717777171717717711117777777777777777777777
            7777777777777777777777777777777777711111777777777777777777777777777117717717117717717171717777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777111111177777777777777777777777777177771177171771177177717777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777111111177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777771111111117777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777771111111117777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777711111111111777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777711111111111111111111111111111111111111111177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777111111111111111111111111111111111111111111117777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777711111111111111111111111111111111111111111111111177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777111117771111771171117111777177717771711171111111117777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7771111111711117117177177111711117111711711171111111111777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7771111111711117777171717111177117111711711171111111111777777777711111717771771177111117111717717111711171177777777117117111717717717771177117777777777777777777
            7711111117771117117171117111777117117771777177711111111177777777777177711711717717177777717711717177717771717777777171717177711717111717717171777777777777777777
            7111111111111111111111111111111111111111111111111111111117777777777177717171711117177117717717117117711771177711117177717117717117717717717117777777777777777777
            7111111111111111111111111111111111111111111111111111111117777777777177717771717717177717717717717177717771717777777177717177717717717717717171777777777777777777
            7111111111111111111111111111111111111111111111111111111117777777711111717771717717111117111717717111711171717777777177717111717717717771177171777777777777777777
            7111111111112211211122212121222111111111111111111111111117777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7111111111121121211112112121221111111111111111111111111117777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7111111111122221211112112121211111111111111111111111111117777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
            71111111111211212221222112112221717171111111111111111111177777777777777cccccccccccccc777777777777777777777777777777777777777777777777777777777777777777777777777
            71111111111111111111111111111111111111111111111111111111177777777777777cbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777777777
            77111111111111111111111111111111111111111111111111111111777777777777777cbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777777777
            77711111111111111111111111111111111111111111111111111117777777777777777cbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777777777
            77711111111111111111111111111111111111111111111111111117777777777777777cbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777777777
            77771111111111111111111111111111111111111111111111111177777777777777777cbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777777777
            77777111111111111111111111111111111111111111111111111777777777777777777cbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777777777
            77777771111111111111111111111111111111111111111111177777777777777777777cbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777111111111111111111111111111111111111111111777777777777777777777cbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777cccccccccccccc777777777777777777777777777777777777777777777777777777777777777777777777777
            77777777777777777777777777777777777777777777777777777777777777777777777ffffff44ffffff777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777ffff33ffff77777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777777777777777ff55ff7777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777fbbf77777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777755777777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777777555577777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777775555557777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777755555555777777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777777555555555577777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777711177777777777777777777777777777111777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777711119999999999999999999999999991111777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111999999999999999999999999911111777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111a99999999999999999999999a11111777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111a99999999999999999999999a11111777777777777
            7777777777777777777777777777777777777777777777777777711177177771177177715111511151117111711171177111777777777777711111ab999999999999999999999ba11111777777777777
            777777777777777dd77777777777777777777777777777777777717717177717717717175515515551557717717771717177777777777777711111ab999999999999999999999ba11111777777777777
            777777777777777dd77777777777777777777777777777777777711177177711117771775515511551117717711771177111777777777777711111ab999999999999999999999ba11111777777777777
            777777777777777dd777ddd77777777777777777777777777777717777177717717771775515515555517717717771717771777777777777711111ab999999999999999999999ba11111777777777777
            bb77777777777777777ddddd7777777777777777777777777777717777111717717771775515511151117717711171717111777777777777711111ab999999999999999999999ba11111777777777777
            bb7777777777777777dd7d7dd777777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111ab999999999999999999999ba11111777777777777
            bbfff77777dd777777ddddddd777777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111ab999999999999999999999ba11111777777777777
            bbfff77777dd7777777dd7dd7777777777777777777777777771111111111111111111111111111111111111111111111111111777777777711111ab999999999999999999999ba11111777777777777
            bbfff77777dd7777777d7d7d7777777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111ab999999999999999999999ba11111777777777777
            bbfffdd77777777dd77777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111ab999999999999999999999ba11111777777777777
            bbfffdd77777777dd77777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111ab999999999999999999999ba11111777777777777
            bbfffdd777777777777ddddddddd777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111ab999999999999999999999ba11111777777777777
            bbfffdd777ddddd7777d7777777d777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111ab999999999999999999999ba11111777777777777
            bbfffdd77ddddddd777d7dd7dd7d777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111ab999999999999999999999ba11111777777777777
            bbfff777ddddddddd77d777d777d777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111ab999999999999999999999ba11111777777777777
            bbfff777d77ddd77d777dd777dd7777777777777777777777777777777777777777777775555555555557777777777777777777777777777711111ab999999999999999999999ba11111777777777777
            bb777777d777d777d7777d777d77777777777777777777777777771177711711777711175533553553551177177177117777777777777777711111a99999999999999999999999a11111777777777777
            bb777777dddd7dddd77777ddd777777777777777777777777777771717171717177717715355353353537717117171771777777777777777711111a99999999999999999999999a11111777777777777
            bb7777777ddddddd777777777777777777777777777777777777771771771711777711175333353533531117171171111777777777777777711111a99999999999999999999999a11111777777777777
            7777777777ddddd7777777777777777777777777777777777777771777771717177717715355353553537717177171771777777777777777711111999999999999999999999999911111777777777777
            7777777777d7d7d7777777777777777777777777777777777777771777771717171711175355353553537717177171771777777777777777711119999999999999999999999999991111777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777711177777777777777777777777777777111777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777771117117111711177713553553535551717771717771777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777177177177771777715353553533531711711771717777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777177117111771777715353553535351717171777177777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777177177771771777715353553535551717771777177777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777177117111771777713555335535551717771777177777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777177171117177717775355535533551117177771117777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777171771777717177775535355355351777177777177777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777117771177771771115553555355351117111777177777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777171771777771777775553555355357717177177177777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777177171117771777775553555533551117177171117777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777771177175535333353537177777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777717717175555355553537177777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777717717175535333553537177777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777717717175535355555557777777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777771177113535333353537177777777777777777777777777777777777777777777777777777777777777777777777777
            7777777777777777777777777777777777777777777777777777777777777777777777775555555555557777777777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cccccccccccccccccccccccccccc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cbbbbbbbbbbbbcbbbbbbbbbbbbbc777777777777777777777777777777777777777777777777777777777777777777777
            777777777777777777777777777777777777777777777777777777777777777cccccccccccccccccccccccccccc777777777777777777777777777777777777777777777777777777777777777777777
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
        mySprite.setFlag(SpriteFlag.Invisible, true)
        mySprite.setPosition(190, 0)
        platformer.moveSprite(mySprite, false)
        timer.after(5000, function () {
            scroller.scrollBackgroundWithSpeed(0, -8)
            timer.after(52000, function () {
                scroller.setBackgroundScrollOffset(0, 0)
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
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777c7777c7777777777777777777777777777777
                    77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777bbebbebb777777777777777777777777777777
                    77777777777777777777777777777777777777777777777777777777777777777777777777777711177117711771117117777111717717777777777777be9ee9eb777777777777777777777777777777
                    77777777777777777777777777777777777777777777777777777777777777777777777777777717771771717171777171777717711717777777777777beeeeeeb777777777777777777777777777777
                    77777777777777777777777777777777777777777777777777777777777777777777777777777717771771717171177171777717717117777777777777bbeeeebb777777777777777777777777777777
                    77777777777777777777777777777777777777777777777777777777777777777777777777777717771771717171777171777717717717777777777777bbbeebbb777777777777777777777777777777
                    77777777777777777777777777777777777771771711171117111777117711177777777777777711177117711771117117777111717717777777777777bbbbbbbb777777777777777777777777777777
                    777777777777777777777777777777777777711717177717771771717717717777777777777777777777777777777777777777777777777777777777777ff77ff7777777777777777777777777777777
                    777777777777777777777777777777777777717117117711171117717717717777777711111717777111711171177771117177771177111171111777bbbbbbbbbbbbb777777777777777777777777777
                    777777777777777777777777777777777777717717177777171771717717717711117777177717777177771771717771777177717717177771777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777717717111711171117771177717777777777177711117117771771177771777177711117111171111777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777177717717177771771717771777177717717777177771777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777177717717111711171717771117111717717111171111777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777bbbbbbbbbbbbb777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    7777777777777777777777777777777777777777777777777777777fffffffff77777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    7777777777777777777777777777777777777777777777777777777fffffffff77777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    77777777777777777777777777777777777777777777777777777ff77777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    77777777777777777777777777777777777777777777777777777ff77777776777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    7777777777777777777777777777777fffff777777777777777ff7777777769677777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    7777777777777777777777777777777fffff777777777777777ff7777777776967777777777777777777777777777777777777666777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777ffff11666ff777777777ffccffccfffffff6967776677777777777777777777777777777776999888777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777ffff11666ff777777777ffccffccfffffff6967766967777777777777777777776667777778869966887777777777b11111111111b777777777777777777777777777
                    777777777777777777777777fff111111111ff666666999ffccfffffffffff6667699677777777777777777777689996777886666996668777777777b11111111111b777777777777777777777777777
                    777777777777777777777777fff111111111ff666666999ffccfffffffffff9966966777777777777777767776969668788666999999966877777777b11111111111b777777777777777777777777777
                    77777777777777777777ffff111111111111ff666666699ff1111bbbffffffcc99677677777777777777696886999688866699999999996687777777bbbbbbbbbbbbb777777777777777777777777777
                    77777777777777777777ffff111111111111ff666666699ff1111bbbffffffcc96676967777777777777699666999666669999911111999987777777b11111111111b777777777777777777777777777
                    77777777777777777777ff11111111111bbf77777777777ff111111bbbffffccc9669677777777777777869999999999999111111111119967777777b11111111111b777777777777777777777777777
                    77777777777777777777ff111111111bbbbf77777777777ff1111111bbbbffcc99696777777777777777866999999999999111111111119996777777b11111111111b777777777777777777777777777
                    77777777777777777777ff111111111bbbbf77777777777ff1111111bbbbffcc96967777777777777777786696666669669999911111999969677777b11111111111b777777777777777777777777777
                    77777777777777777777ff1111111bbbbbbffffffffffff11111111111bbbb9969677777777777777777769999668888966699999999999986777777b11111111111b777777777777777777777777777
                    77777777777777777777ff1111111bbbbbbffffffffffff11111111111bbbb9996777777777777777777696669967777999966999999999877777777b11111111111b777777777777777777777777777
                    77777777777777777777ffff111bbbbbbbbffffffffffffff111111bbbbbbb9696777777777777777777867786677777777999666666999877777777b11111111111b777777777777777777777777777
                    77777777777777777777ffff111bbbbbbbbffffffffffffff111111bbbbbbb6769677777777777777777777778877777777778996699888967777777b11111111111b777777777777777777777777777
                    777777777777777777777777ffffffffffff7777777777777fffffffffffff7776777777777777777777777777777777777777699998877677777777b11111111111b777777777777777777777777777
                    777777777777777777777777ffffffffffff7777777777777fffffffffffff7777777777777777777777777777777777777776996996877777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777ff7777777777777777777777777777777777777777777777777668696777777777777bbbbbbbbbbbbb777777777777777777777777777
                    777777777777777777777777777777777777777777777777777ff7777777777777777777777777777777777777777777777777777867777777777777b11111111111b777777777777777777777777777
                    77777777777777777777777777777777777777777777777777777ff77777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    77777777777777777777777777777777777777777777777777777ff77777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    7777777777777777777777777777777777777777777777777777777fffffffff77777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    7777777777777777777777777777777777777777777777777777777fffffffff77777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777b11111111111b777777777777777777777777777
                    777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777bbbbbbbbbbbbb777777777777777777777777777
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
                    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777711777117711171117117777771177711777111717777111777111177117717771711
                    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777717171771717771777171777717717717777717717777177777177771771711711717
                    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777711771111711171177171777717717111777717711777117777171171111717171711
                    7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777717171771777171777171777717717717777717711177177777177171771717771717
                    7777777777774357777777777777777777777777777777777777777777777777777777777777777777777777777711771771711171117117777771177717777717717717111777111171771717771711
                    7777777777774357111111177177717777117777177771771771777177717711777177177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777774357777177777177717771771777177771771717777717177177177177177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777774357777177777177717717777177117771771717777771777177177177177777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777774357777177777111117711111177171771771177777771777177177177177777777777777777777711177777777777777777777777777777777777777777777777777777777777777777
                    777777777777435777717777717771771111117717717177117777777177717717717717777777777777777777771771777777777e77777e777777e777e77777e7eeee77777222227777777777777777
                    777777777777435777717777717771771777717717771177117777777177717717717717777777777777777777771117717717777e77777e77ee77e777e77777e7e7777777277c772777777777777777
                    777777777777435777717777717771771777717717777177171777777177717717717717777777777777777777771771771177777e77777e7e77e7e777e77777e7e7777772777c777277777777777777
                    7777777777774357777177777177717717777177177771771771777771777711777711777777777777777777777711177771777777e777e77eeee7e7777e777e77eee777727772777277777777777777
                    7777777777774357777777777777777777777777777777777777777777777777777777777777777777777777777777777717777777e777e77e77e7e7777e777e77e777777277c7c77277777777777777
                    77777777777777777777777777777777777777777777777777777777777777777777777777777777968777777777777771777777777e7e777e77e7e77777e7e777e77777727c777c7277777777777777
                    777777777777777777777777777711177117711177771117717777111771777171117177717111179687777777777777777777777777e7777e77e7eee7777e7777eeee77772777772777777777777777
                    7777777777777777777777777777177717717177177717717177711711771717771771177171777796877777777777777777777777777777777777777777777777777777777222227777777777777777
                    7777777777777777777777777777117717717111777711177177717771777177771771717171777796877777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777777777177717717117777717777177711111777177771771771171777796877777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777777777177717717171777717777177717771777177771771777171711796877777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777777777177717717171777717777177717771777177771771777171771796877777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777777777177771177177177717777111717771777177711171777171111796877777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777777777777777777777777777777777777777777777777777777777777796877777777777777777777777777777777777777777777777777777777777777777777777777777
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
                    777777777777777777777777777777777777777c77cce744441444bec7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777777777777777777b11511111155111111111114777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777777777777777777c77e4541455555555555555555555551114777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777777777777777774111555554555554444445444444455551117cc77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777777777777777e11155555545444ee444444444444455555555114cccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777777777777411555555443433444eeeeeee4eeeee444444555511ccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777415555554434433333334444444444444444455555551eccccc777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777775155544433333333333333334444444444444445555551ecccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777e45555444333333333333333333333333333444555555511cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777777e155545444333333333333333333333333444444555555514ecccccccc777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777771555545444333333333333333333333344444455555551154433333ccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777777e1555544444333333333333333333333334444445555511554433cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777771555554444444442333333333333333344444445551155544433cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777777715555555444444444333333333444444444444551155555444333ccccccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777777e51555555544444444444444444444444445551115555544444333c3ccccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777745511555555444444444444444444444551111555555454444433333cccccc777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777344555111555444454554444444555511115555555544444444433333cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777344455555411111115555111111114555555555554444444444333333cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777773344444555555555555555555555555555555554444444444444333333cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777773344444444444444444555555555555555555444444444444443333333cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777c3334444444444444444444444444444444444444444444444443333333cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777733333444444444444444444444444444444444444444444444443333333cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777733333344444444444444444444444444444444444444444443333333333cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777c333333333344444444444bb444444444444444444444444433333333333cccccc777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777c333333333333333444443bb444444444444444444444434333333333333ccccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777c333333333333333333333bbb44444444444444444433333333333333333ccccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777cc33333333333333333333bbb43344444444444334333333333333333333ccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777ccc3333333333333333333bbb443333333333433343333333333333333cccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777ccc3333333333333333333bbb4333333333343334333333333333333cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777cccc333333333333333333bbb333333333333333b33333333333333ccccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777cccc33333333333333333bbbb43333333333333b3333333333333cccccccccc7777777777777777799999777777777777777777777777777777777777777777777777777777777777
                    77777777777777777cccc333333333333333bbbb33333333333333b333333333333ccccccccccc7777777777777777996c99977777777777777777777777777777777777777777777777777777777777
                    77777777777777777ccccccc333333333333bbbbb333333333333333333333333ccccccccccccc7777777777777779677779977777777777777777777777777777777777777777777777777777777777
                    777777777777777777cccccc3ccc333333333bbbbb333333333334444433333ccccccccccccccc7777777777777699777776967777777777777777777777777777777777777777777777777777777777
                    777777777777777777cccccc3ccccccccc3333bbbb3333333333344433333ccccccccccccccccc7777777777777c97777777697777777777777777777777777777777777777777777777777777777777
                    77777777777777777777cccc3cccccccccccccbbbbb333c3333333bbb3333cccccccccccccccc77777777777776997777777697777777777777777777777777777777777777777777777777777777777
                    77777777777777777777cccc3cccccccccccccccbbbb33cccc333bbbbbcccccccccccccccccc7777b1111177779977777777697b111111777b111111117777b111777777b11177777777777777777777
                    777777777777777777777cccccccccccccccccccbbbbb33cccc3bbbbbbbccccccccc3bbcccc77777b1111117779977777777c97b111111177bccc11ccc7777b111b77777b11177777777777777777777
                    7777777777777777eee4444433cccccccccccccccbbbbb3cccc3bbbbb66cccccccc33bbbccc77777b1177117769677777777797b11b771177777b11777777b1111177777b11177777777777777777777
                    7777777777777777bbbbb33333333cccccccccccccbbbbb33cc3bbbbb66ccccccc33bbb66cc77777b1177117799777777777797b11b771177777b11777777b1171177777b11177777777777777777777
                    77777777777777777bbbbbbbbbbb33cccccccccccccbbbbb33bbb666666cccccc33bbfb6cc777777b1111117799777777777c97b111111177777b11777777b11f1117777b11177777777777777777777
                    777777777777777777bbbbbbbbbbb33cccccccccccccbbbbbbbbb666666ccccc33bbfb66c7777777b1111177799777777777697b11111b777777b1177777b11111117777b11177777777777777777777
                    7777777777777777777bbbbbbbbbbb333cccccccccc3bbbbbbbbbb6666ccccc33bbfbb66c7777777b1177777799777777777997b11b11c777777b1177777b1111111c777b11177777777777777777777
                    77777777777777777777777bbbbbbbb333cccccccc33bbbbbbbbbbbbcccccc33bbfbbb6ccc777777b11777777997777777779c7b11b711777777b117777b111777111777b111111b7777777777777777
                    777777777777777777777777ccbbbbbc333cccccc33cbbbbbbbbbbbb3333333bbfbbbb6cccc77777b1177777799777777776977c11b711177777b117777b111777111777b111111b7777777777777777
                    777777777777777777777777cccbbbbbc333cccc33cbbbbbbbbbbbbbbbbbbbbbfbbbb66ccccc7777cbb77777799777777779677ccbc771b77777bcb7777bcbc7777bbc77bcbbbbbc7777777777777777
                    777777777777777777777777cccbbbbbbc3333333cbbbbbbbbbbbbbbbbbbbbbbbbbb66ccccc7777777777777769777777799c77777777777777777777777777777777777777777777777777777777777
                    777777777777777777777777cccbbbbbbbc3333cbbbbbbbbbbbbbbbbbbbbbbbbbbbb6cccccc777777777777777967777769c777777777777777777777777777777777777777777777777777777777777
                    777777777777777777777777ccccccbbbbbbcccbbbbbbbb6666666666666666666666cccccc777777777777777699996996c777777777777777777777777777777777777777777777777777777777777
                    777777777777777777777777cccccccbbbbbbbbbbbbbb666666666666666666666ccccccccc7777777777777777999999677777777777777777777777777777777777777777777777777777777777777
                    777777777777777777777777cccccccbbbbbbbbbbbbb66666cccccccccccccccccccccccccc777777777777777779999c777777777777777777777777777777777777777777777777777777777777777
                    777777777777777777777777cccccccbbbbbbbbbbb666666ccccccccccccccccccccccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777777777777cccccbbbbbbbbb666666666cccccccccccccccccccccccccccc7111771777117711117717711117111117777717117771717177711777117777717117711111777777777
                    77777777777777777777777cccbbbbbbbbbb6666666666ccccccccccccccccccccccccccccc7171771777117717711717777177777177777117111771717117711777117777117717777771777777777
                    7777777777777777777777cbbbbbbbbb6666666666666cccccccccccccccccccccccccccccc7171771777117717771717777177771177777117171771717111711777117771117717777717777777777
                    7777777777777777777777bb6666666666666666666cccccccccccccccccccccccccccccccc7111171177117717711717771177711777771117171171717171711777117711717717777117777777777
                    7777777777777777777776666666666666666666ccccccccccccccccccccccccccccccccccc7177177111117711117717711777717777711717177111717177111777117717717717771177777777777
                    7777777777777777777776666666666666666ccccccccccccccccccccccccccccccccccccccc177177711117717777717711777117777717717177771717177111771177117717717771777777777777
                    77777777777777777777766666666666cccccccccccccccccccccccccccccccccccccccccccf111177771177717777717111117111111717717177771717177711711177177717111711777777777777
                    7777777777777777777776666666cccccccccccccccccccccccccccccccccccccccccccccccc777777771177777777717777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777cccccccccccccccccccccccccccccccccccccccccccccccccccccc777777711777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777cccccccccccccccccccccccccccccccccccccccccccccccccccccc777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777777777ccccccccccccccccccccccccccc6cc6cccccc6c6ccccccccccccccc777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777777777cccccccccccccccccc6666666668cc6c666666866cccccccccccccc777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777777777cccccccccc8cccccccc66666666668666666666666cc6cccccccccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777788ccccccc888888888888666666666666666666666666ccccccccccc777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777788cccc888866666666668666666666666666666666666c6cccccccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777777788cccc88866666666666666666666666666666666666666ccccccccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777888cc88866666666666666666666666666666666666666668cccccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777777888888886666666666666666666666666666666666666666688ccccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777777888c88866666666666669999999969999666666666666666666ccccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777778888886666669999999999999999996999999999996666666666ccccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777777788888869999999999911196666666669669199999666996666668cccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777788cc889999999996666666668886666666666661119669999996668ccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777888899666999991666668888888888888666666666666999999999888ccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777886999999999996666688888886888888866666666666199999999966ccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777778889999999999666666888888888888888866666666666199999966666ccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777788999999999669996668888888888888888666666666669666669999996cccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777778c9999999869999996688888888888688886666666666999999999999998ccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777778c999996669999999988888866666666888666691199999999999999999ccccc777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777788996669999999999968869999668866668119999999999999999999968cccc777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777778888899999999999999988699999999999996686669999999999999996ccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777777888869999999999999998889999999999999999999996666699999668cc777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777778cc8869999999999999966699999999999999999999999999966666cc7777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777777777c88666699999999999966699999999999999999999999966688ccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777778c886866666999999996669999999999999999999966888ccccc777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    77777777777777777777777ccc8868666668666696666999999999996666666668cccc777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777777ccccc8888888888c8666666666666666868888ccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777777777ccccccccc88ccccc88888886888888cccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    7777777777777777777777777777777777cccccccccccccccccccccccccccc77777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    777777777777777777777777777777777777777777777ccccccccc7777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777777
                    `)
                music.setVolume(15)
                timer.after(24650, function () {
                    scroller.scrollBackgroundWithSpeed(0, 0)
                    scroller.scrollBackgroundWithCamera(scroller.CameraScrollMode.OnlyHorizontal)
                    music.setVolume(10)
                    timer.after(500, function () {
                        music.setVolume(5)
                        music.stopAllSounds()
                        timer.after(500, function () {
                            music.setVolume(40)
                            timer.after(1000, function () {
                                story.printText("Your finial time was...", 80, 0, 1, 7, story.TextSpeed.VerySlow)
                                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
                                effects.confetti.startScreenEffect()
                                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
                                story.printText("" + convertToText(blockSettings.readNumber("Time")) + "!", 80, 0, 1, 7, story.TextSpeed.Normal)
                                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
                                story.printText("" + convertToText(blockSettings.readNumber("Time")) + "!", 80, 0, 1, 7, story.TextSpeed.Fast)
                                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
                                story.printText("" + convertToText(blockSettings.readNumber("Time")) + "!", 80, 0, 1, 7, story.TextSpeed.Fast)
                                music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.InBackground)
                                color.startFade(color.originalPalette, color.Black, 4000)
                                timer.after(4000, function () {
                                    blockSettings.clear()
                                    game.reset()
                                })
                            })
                        })
                    })
                })
            })
        })
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
sprites.onOverlap(SpriteKind.Player, SpriteKind.laser, function (sprite, otherSprite) {
    game.setGameOverMessage(false, "Fried by a laser")
    game.gameOver(false)
})
scene.onOverlapTile(SpriteKind.Player, assets.tile`myTile66`, function (sprite, location) {
    radioFound = true
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
controller.up.onEvent(ControllerButtonEvent.Released, function () {
    if (compainionRobotControl) {
        compainionRobotControl = false
        mySprite.vy = -100
        scene.cameraShake(2, 500)
        controller.moveSprite(compainionRobot, 0, 0)
        tiles.placeOnTile(compainionRobot, tiles.getTileLocation(10, 7))
        compainionRobot.startEffect(effects.fountain)
        timer.after(1000, function () {
            effects.clearParticles(compainionRobot)
            mySprite.vy = 0
            platformer.moveSprite(mySprite, true)
            for (let value of tiles.getTilesByType(assets.tile`myTile73`)) {
                tiles.setTileAt(value, assets.tile`myTile72`)
            }
        })
    }
})
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
    if (holdingCube && !(compainionRobotControl)) {
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
scene.onOverlapTile(SpriteKind.robotController, assets.tile`myTile36`, function (sprite, location) {
    music.play(music.melodyPlayable(music.baDing), music.PlaybackMode.UntilDone)
    blockSettings.writeNumber("Level", blockSettings.readNumber("Level") + 1)
    game.reset()
})
sprites.onOverlap(SpriteKind.Player, SpriteKind.OrangePortal, function (sprite, otherSprite) {
    if (!(blueFizzled || orangeFizzled)) {
        doPortalOverlap(false, sprite)
    }
})
controller.menu.onEvent(ControllerButtonEvent.Pressed, function () {
    if (level != 22) {
        blockSettings.writeString("Menu", "Exists")
        game.reset()
    }
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
function robotControl () {
    compainionRobot = sprites.create(img`
        . c . . . . c . 
        b b e b b e b b 
        b e 9 e e 9 e b 
        b e e e e e e b 
        b b e e e e b b 
        b b b e e b b b 
        b b b b b b b b 
        . f f . . f f . 
        `, SpriteKind.robotController)
    compainionRobot.ay = 200
    compainionRobotControl = false
    tiles.placeOnTile(compainionRobot, tiles.getTileLocation(10, 7))
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
        if (level == 13) {
            holdingCube = false
            summonCube(8, 8)
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
        if (mecnisum1) {
            tiles.setTileAt(tiles.getTileLocation(13, 8), assets.tile`myTile71`)
            tiles.setWallAt(tiles.getTileLocation(13, 8), true)
            tiles.setTileAt(tiles.getTileLocation(12, 8), assets.tile`myTile71`)
            tiles.setWallAt(tiles.getTileLocation(12, 8), true)
            tiles.setTileAt(tiles.getTileLocation(14, 8), assets.tile`myTile71`)
            tiles.setWallAt(tiles.getTileLocation(14, 8), true)
            tiles.setTileAt(tiles.getTileLocation(13, 10), assets.tile`transparency8`)
            tiles.setWallAt(tiles.getTileLocation(13, 10), false)
            tiles.setTileAt(tiles.getTileLocation(12, 10), assets.tile`transparency8`)
            tiles.setWallAt(tiles.getTileLocation(12, 10), false)
            tiles.setTileAt(tiles.getTileLocation(14, 10), assets.tile`transparency8`)
            tiles.setWallAt(tiles.getTileLocation(14, 10), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(13, 8), assets.tile`transparency8`)
            tiles.setWallAt(tiles.getTileLocation(12, 8), false)
            tiles.setTileAt(tiles.getTileLocation(14, 8), assets.tile`transparency8`)
            tiles.setWallAt(tiles.getTileLocation(14, 8), false)
            tiles.setTileAt(tiles.getTileLocation(12, 8), assets.tile`transparency8`)
            tiles.setWallAt(tiles.getTileLocation(13, 8), false)
            tiles.setTileAt(tiles.getTileLocation(13, 10), assets.tile`myTile71`)
            tiles.setWallAt(tiles.getTileLocation(13, 10), true)
            tiles.setTileAt(tiles.getTileLocation(14, 10), assets.tile`myTile71`)
            tiles.setWallAt(tiles.getTileLocation(14, 10), true)
            tiles.setTileAt(tiles.getTileLocation(12, 10), assets.tile`myTile71`)
            tiles.setWallAt(tiles.getTileLocation(12, 10), true)
        }
        if (mecinuims3) {
            tiles.setTileAt(tiles.getTileLocation(9, 3), assets.tile`myTile10`)
            tiles.setWallAt(tiles.getTileLocation(9, 3), false)
        } else {
            tiles.setTileAt(tiles.getTileLocation(9, 3), assets.tile`myTile9`)
            tiles.setWallAt(tiles.getTileLocation(9, 3), true)
        }
        if (mecnisum2) {
            tiles.setTileAt(tiles.getTileLocation(6, 10), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(6, 11), assets.tile`transparency8`)
            tiles.setTileAt(tiles.getTileLocation(6, 12), assets.tile`transparency8`)
        } else {
            tiles.setTileAt(tiles.getTileLocation(6, 10), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(6, 11), assets.tile`myTile23`)
            tiles.setTileAt(tiles.getTileLocation(6, 12), assets.tile`myTile23`)
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
    if (controller.down.isPressed() && !(holdingGreen) && !(compainionRobotControl)) {
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
        story.spriteSayText(GLaDOSSprite, "Despite your violent behavior the only thing you have managed to break so far is *Static*", 9, 1)
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
let compainionRobot: Sprite = null
let inOrangePortal = false
let inBluePortal = false
let laserSprite: Sprite = null
let mecinuims3 = false
let mecnisum2 = false
let mecnisum1 = false
let level = 0
let holdingCube = false
let compainionRobotControl = false
let radioFound = false
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
music.stopAllSounds()
game.setDialogCursor(assets.image`BigTurret`)
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
    radioFound = false
    compainionRobotControl = false
    if (blockSettings.exists("Level")) {
        loadLevel(blockSettings.readNumber("Level"))
    } else {
        blockSettings.writeNumber("Volume", 100)
        blockSettings.writeNumber("Time", 0)
        tiles.setCurrentTilemap(tileUtil.createSmallMap(tilemap`Testchamber2`))
        mySprite.setFlag(SpriteFlag.GhostThroughSprites, false)
        portalsEnabled = false
        holdingCube = false
        tiles.placeOnTile(mySprite, tiles.getTileLocation(2, 13))
        screenOverlay = sprites.create(assets.image`Thumbnail`, SpriteKind.prop)
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
        multilights.addLightSource(laserSprite)
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
                    . . b b . . . . . 
                    . . . b . . . . . 
                    . 9 9 b b c b b . 
                    9 8 c c b c b b b 
                    . 9 9 b b c b b . 
                    . . . b . . . . . 
                    . . b b . . . . . 
                    `,img`
                    . . b b . . . . . 
                    . . . b . . . . . 
                    . . 9 b b c b b . 
                    . 9 c c b c b b b 
                    . . 9 b b c b b . 
                    . . . b . . . . . 
                    . . b b . . . . . 
                    `],
                100,
                true
                )
            } else {
                animation.runImageAnimation(
                bulletSprite,
                [img`
                    . . . . . b b . . 
                    . . . . . b . . . 
                    . b b c b b 9 . . 
                    b b b c b c c 9 . 
                    . b b c b b 9 . . 
                    . . . . . b . . . 
                    . . . . . b b . . 
                    `,img`
                    . . . . . b b . . 
                    . . . . . b . . . 
                    . b b c b b 9 9 . 
                    b b b c b c c 8 9 
                    . b b c b b 9 9 . 
                    . . . . . b . . . 
                    . . . . . b b . . 
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
    if (!(blockSettings.exists("Menu") || blockSettings.readNumber("Level") == 22)) {
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
