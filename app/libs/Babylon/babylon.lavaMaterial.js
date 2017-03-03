/// <reference path="../../../dist/preview release/babylon.d.ts"/>
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var BABYLON;
(function (BABYLON) {
    var LavaMaterialDefines = (function (_super) {
        __extends(LavaMaterialDefines, _super);
        function LavaMaterialDefines() {
            var _this = _super.call(this) || this;
            _this.DIFFUSE = false;
            _this.CLIPPLANE = false;
            _this.ALPHATEST = false;
            _this.POINTSIZE = false;
            _this.FOG = false;
            _this.LIGHT0 = false;
            _this.LIGHT1 = false;
            _this.LIGHT2 = false;
            _this.LIGHT3 = false;
            _this.SPOTLIGHT0 = false;
            _this.SPOTLIGHT1 = false;
            _this.SPOTLIGHT2 = false;
            _this.SPOTLIGHT3 = false;
            _this.HEMILIGHT0 = false;
            _this.HEMILIGHT1 = false;
            _this.HEMILIGHT2 = false;
            _this.HEMILIGHT3 = false;
            _this.DIRLIGHT0 = false;
            _this.DIRLIGHT1 = false;
            _this.DIRLIGHT2 = false;
            _this.DIRLIGHT3 = false;
            _this.POINTLIGHT0 = false;
            _this.POINTLIGHT1 = false;
            _this.POINTLIGHT2 = false;
            _this.POINTLIGHT3 = false;
            _this.SHADOW0 = false;
            _this.SHADOW1 = false;
            _this.SHADOW2 = false;
            _this.SHADOW3 = false;
            _this.SHADOWS = false;
            _this.SHADOWVSM0 = false;
            _this.SHADOWVSM1 = false;
            _this.SHADOWVSM2 = false;
            _this.SHADOWVSM3 = false;
            _this.SHADOWPCF0 = false;
            _this.SHADOWPCF1 = false;
            _this.SHADOWPCF2 = false;
            _this.SHADOWPCF3 = false;
            _this.NORMAL = false;
            _this.UV1 = false;
            _this.UV2 = false;
            _this.VERTEXCOLOR = false;
            _this.VERTEXALPHA = false;
            _this.NUM_BONE_INFLUENCERS = 0;
            _this.BonesPerMesh = 0;
            _this.INSTANCES = false;
            _this._keys = Object.keys(_this);
            return _this;
        }
        return LavaMaterialDefines;
    }(BABYLON.MaterialDefines));
    var LavaMaterial = (function (_super) {
        __extends(LavaMaterial, _super);
        function LavaMaterial(name, scene) {
            var _this = _super.call(this, name, scene) || this;
            _this.speed = 1;
            _this.movingSpeed = 1;
            _this.lowFrequencySpeed = 1;
            _this.fogDensity = 0.15;
            _this._lastTime = 0;
            _this.diffuseColor = new BABYLON.Color3(1, 1, 1);
            _this.disableLighting = false;
            _this.maxSimultaneousLights = 4;
            _this._worldViewProjectionMatrix = BABYLON.Matrix.Zero();
            _this._scaledDiffuse = new BABYLON.Color3();
            _this._defines = new LavaMaterialDefines();
            _this._cachedDefines = new LavaMaterialDefines();
            _this._cachedDefines.BonesPerMesh = -1;
            return _this;
        }
        LavaMaterial.prototype.needAlphaBlending = function () {
            return (this.alpha < 1.0);
        };
        LavaMaterial.prototype.needAlphaTesting = function () {
            return false;
        };
        LavaMaterial.prototype.getAlphaTestTexture = function () {
            return null;
        };
        // Methods   
        LavaMaterial.prototype._checkCache = function (scene, mesh, useInstances) {
            if (!mesh) {
                return true;
            }
            if (this._defines.INSTANCES !== useInstances) {
                return false;
            }
            if (mesh._materialDefines && mesh._materialDefines.isEqual(this._defines)) {
                return true;
            }
            return false;
        };
        LavaMaterial.prototype.isReady = function (mesh, useInstances) {
            if (this.checkReadyOnlyOnce) {
                if (this._wasPreviouslyReady) {
                    return true;
                }
            }
            var scene = this.getScene();
            if (!this.checkReadyOnEveryCall) {
                if (this._renderId === scene.getRenderId()) {
                    if (this._checkCache(scene, mesh, useInstances)) {
                        return true;
                    }
                }
            }
            var engine = scene.getEngine();
            var needUVs = false;
            this._defines.reset();
            // Textures
            if (scene.texturesEnabled) {
                if (this.diffuseTexture && BABYLON.StandardMaterial.DiffuseTextureEnabled) {
                    if (!this.diffuseTexture.isReady()) {
                        return false;
                    }
                    else {
                        needUVs = true;
                        this._defines.DIFFUSE = true;
                    }
                }
            }
            // Effect
            if (scene.clipPlane) {
                this._defines.CLIPPLANE = true;
            }
            if (engine.getAlphaTesting()) {
                this._defines.ALPHATEST = true;
            }
            // Point size
            if (this.pointsCloud || scene.forcePointsCloud) {
                this._defines.POINTSIZE = true;
            }
            // Fog
            if (scene.fogEnabled && mesh && mesh.applyFog && scene.fogMode !== BABYLON.Scene.FOGMODE_NONE && this.fogEnabled) {
                this._defines.FOG = true;
            }
            if (scene.lightsEnabled && !this.disableLighting) {
                BABYLON.MaterialHelper.PrepareDefinesForLights(scene, mesh, this._defines, this.maxSimultaneousLights);
            }
            // Attribs
            if (mesh) {
                if (mesh.isVerticesDataPresent(BABYLON.VertexBuffer.NormalKind)) {
                    this._defines.NORMAL = true;
                }
                if (needUVs) {
                    if (mesh.isVerticesDataPresent(BABYLON.VertexBuffer.UVKind)) {
                        this._defines.UV1 = true;
                    }
                    if (mesh.isVerticesDataPresent(BABYLON.VertexBuffer.UV2Kind)) {
                        this._defines.UV2 = true;
                    }
                }
                if (mesh.useVertexColors && mesh.isVerticesDataPresent(BABYLON.VertexBuffer.ColorKind)) {
                    this._defines.VERTEXCOLOR = true;
                    if (mesh.hasVertexAlpha) {
                        this._defines.VERTEXALPHA = true;
                    }
                }
                if (mesh.useBones && mesh.computeBonesUsingShaders) {
                    this._defines.NUM_BONE_INFLUENCERS = mesh.numBoneInfluencers;
                    this._defines.BonesPerMesh = (mesh.skeleton.bones.length + 1);
                }
                // Instances
                if (useInstances) {
                    this._defines.INSTANCES = true;
                }
            }
            // Get correct effect      
            if (!this._defines.isEqual(this._cachedDefines)) {
                this._defines.cloneTo(this._cachedDefines);
                scene.resetCachedMaterial();
                // Fallbacks
                var fallbacks = new BABYLON.EffectFallbacks();
                if (this._defines.FOG) {
                    fallbacks.addFallback(1, "FOG");
                }
                BABYLON.MaterialHelper.HandleFallbacksForShadows(this._defines, fallbacks);
                if (this._defines.NUM_BONE_INFLUENCERS > 0) {
                    fallbacks.addCPUSkinningFallback(0, mesh);
                }
                //Attributes
                var attribs = [BABYLON.VertexBuffer.PositionKind];
                if (this._defines.NORMAL) {
                    attribs.push(BABYLON.VertexBuffer.NormalKind);
                }
                if (this._defines.UV1) {
                    attribs.push(BABYLON.VertexBuffer.UVKind);
                }
                if (this._defines.UV2) {
                    attribs.push(BABYLON.VertexBuffer.UV2Kind);
                }
                if (this._defines.VERTEXCOLOR) {
                    attribs.push(BABYLON.VertexBuffer.ColorKind);
                }
                BABYLON.MaterialHelper.PrepareAttributesForBones(attribs, mesh, this._defines, fallbacks);
                BABYLON.MaterialHelper.PrepareAttributesForInstances(attribs, this._defines);
                // Legacy browser patch
                var shaderName = "lava";
                var join = this._defines.toString();
                this._effect = scene.getEngine().createEffect(shaderName, attribs, ["world", "view", "viewProjection", "vEyePosition", "vLightsType", "vDiffuseColor",
                    "vLightData0", "vLightDiffuse0", "vLightSpecular0", "vLightDirection0", "vLightGround0", "lightMatrix0",
                    "vLightData1", "vLightDiffuse1", "vLightSpecular1", "vLightDirection1", "vLightGround1", "lightMatrix1",
                    "vLightData2", "vLightDiffuse2", "vLightSpecular2", "vLightDirection2", "vLightGround2", "lightMatrix2",
                    "vLightData3", "vLightDiffuse3", "vLightSpecular3", "vLightDirection3", "vLightGround3", "lightMatrix3",
                    "vFogInfos", "vFogColor", "pointSize",
                    "vDiffuseInfos",
                    "mBones",
                    "vClipPlane", "diffuseMatrix",
                    "shadowsInfo0", "shadowsInfo1", "shadowsInfo2", "shadowsInfo3", "depthValues",
                    "time", "speed", "movingSpeed",
                    "fogColor", "fogDensity", "lowFrequencySpeed"
                ], ["diffuseSampler",
                    "shadowSampler0", "shadowSampler1", "shadowSampler2", "shadowSampler3", "noiseTexture"
                ], join, fallbacks, this.onCompiled, this.onError, { maxSimultaneousLights: this.maxSimultaneousLights - 1 });
            }
            if (!this._effect.isReady()) {
                return false;
            }
            this._renderId = scene.getRenderId();
            this._wasPreviouslyReady = true;
            if (mesh) {
                if (!mesh._materialDefines) {
                    mesh._materialDefines = new LavaMaterialDefines();
                }
                this._defines.cloneTo(mesh._materialDefines);
            }
            return true;
        };
        LavaMaterial.prototype.bindOnlyWorldMatrix = function (world) {
            this._effect.setMatrix("world", world);
        };
        LavaMaterial.prototype.bind = function (world, mesh) {
            var scene = this.getScene();
            // Matrices        
            this.bindOnlyWorldMatrix(world);
            this._effect.setMatrix("viewProjection", scene.getTransformMatrix());
            // Bones
            BABYLON.MaterialHelper.BindBonesParameters(mesh, this._effect);
            if (scene.getCachedMaterial() !== this) {
                // Textures        
                if (this.diffuseTexture && BABYLON.StandardMaterial.DiffuseTextureEnabled) {
                    this._effect.setTexture("diffuseSampler", this.diffuseTexture);
                    this._effect.setFloat2("vDiffuseInfos", this.diffuseTexture.coordinatesIndex, this.diffuseTexture.level);
                    this._effect.setMatrix("diffuseMatrix", this.diffuseTexture.getTextureMatrix());
                }
                if (this.noiseTexture) {
                    this._effect.setTexture("noiseTexture", this.noiseTexture);
                }
                // Clip plane
                BABYLON.MaterialHelper.BindClipPlane(this._effect, scene);
                // Point size
                if (this.pointsCloud) {
                    this._effect.setFloat("pointSize", this.pointSize);
                }
                this._effect.setVector3("vEyePosition", scene._mirroredCameraPosition ? scene._mirroredCameraPosition : scene.activeCamera.position);
            }
            this._effect.setColor4("vDiffuseColor", this._scaledDiffuse, this.alpha * mesh.visibility);
            if (scene.lightsEnabled && !this.disableLighting) {
                BABYLON.MaterialHelper.BindLights(scene, mesh, this._effect, this._defines);
            }
            // View
            if (scene.fogEnabled && mesh.applyFog && scene.fogMode !== BABYLON.Scene.FOGMODE_NONE) {
                this._effect.setMatrix("view", scene.getViewMatrix());
            }
            // Fog
            BABYLON.MaterialHelper.BindFogParameters(scene, mesh, this._effect);
            this._lastTime += scene.getEngine().getDeltaTime();
            this._effect.setFloat("time", this._lastTime * this.speed / 1000);
            if (!this.fogColor) {
                this.fogColor = BABYLON.Color3.Black();
            }
            this._effect.setColor3("fogColor", this.fogColor);
            this._effect.setFloat("fogDensity", this.fogDensity);
            this._effect.setFloat("lowFrequencySpeed", this.lowFrequencySpeed);
            this._effect.setFloat("movingSpeed", this.movingSpeed);
            _super.prototype.bind.call(this, world, mesh);
        };
        LavaMaterial.prototype.getAnimatables = function () {
            var results = [];
            if (this.diffuseTexture && this.diffuseTexture.animations && this.diffuseTexture.animations.length > 0) {
                results.push(this.diffuseTexture);
            }
            if (this.noiseTexture && this.noiseTexture.animations && this.noiseTexture.animations.length > 0) {
                results.push(this.noiseTexture);
            }
            return results;
        };
        LavaMaterial.prototype.dispose = function (forceDisposeEffect) {
            if (this.diffuseTexture) {
                this.diffuseTexture.dispose();
            }
            if (this.noiseTexture) {
                this.noiseTexture.dispose();
            }
            _super.prototype.dispose.call(this, forceDisposeEffect);
        };
        LavaMaterial.prototype.clone = function (name) {
            var _this = this;
            return BABYLON.SerializationHelper.Clone(function () { return new LavaMaterial(name, _this.getScene()); }, this);
        };
        LavaMaterial.prototype.serialize = function () {
            var serializationObject = BABYLON.SerializationHelper.Serialize(this);
            serializationObject.customType = "BABYLON.LavaMaterial";
            return serializationObject;
        };
        // Statics
        LavaMaterial.Parse = function (source, scene, rootUrl) {
            return BABYLON.SerializationHelper.Parse(function () { return new LavaMaterial(source.name, scene); }, source, scene, rootUrl);
        };
        return LavaMaterial;
    }(BABYLON.Material));
    __decorate([
        BABYLON.serializeAsTexture()
    ], LavaMaterial.prototype, "diffuseTexture", void 0);
    __decorate([
        BABYLON.serializeAsTexture()
    ], LavaMaterial.prototype, "noiseTexture", void 0);
    __decorate([
        BABYLON.serializeAsColor3()
    ], LavaMaterial.prototype, "fogColor", void 0);
    __decorate([
        BABYLON.serialize()
    ], LavaMaterial.prototype, "speed", void 0);
    __decorate([
        BABYLON.serialize()
    ], LavaMaterial.prototype, "movingSpeed", void 0);
    __decorate([
        BABYLON.serialize()
    ], LavaMaterial.prototype, "lowFrequencySpeed", void 0);
    __decorate([
        BABYLON.serialize()
    ], LavaMaterial.prototype, "fogDensity", void 0);
    __decorate([
        BABYLON.serializeAsColor3()
    ], LavaMaterial.prototype, "diffuseColor", void 0);
    __decorate([
        BABYLON.serialize()
    ], LavaMaterial.prototype, "disableLighting", void 0);
    __decorate([
        BABYLON.serialize()
    ], LavaMaterial.prototype, "maxSimultaneousLights", void 0);
    BABYLON.LavaMaterial = LavaMaterial;
})(BABYLON || (BABYLON = {}));

//# sourceMappingURL=babylon.lavaMaterial.js.map
