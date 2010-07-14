"define metadata";
({
    "description": "Vectorscript syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "vss",
            "pointer": "#VectorscriptSyntax",
            "fileexts": [
  "vss"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = null;

var patterns = [
  {
    "name": "keyword.control.vectorscript",
    "match": "\\b(?i:(abstract|all|and|and_then|array|as|asm|attribute|begin|bindable|case|class|const|constructor|destructor|div|do|end|do|else|end|export|exports|external|far|file|finalization|for|forward|goto|if|implementation|import|in|inherited|initialization|interface|interrupt|is|label|library|mod|module|name|near|nil|not|object|of|only|operator|or|or_else|otherwise|packed|pow|private|program|property|protected|public|published|qualified|record|repeat|resident|restricted|segment|set|shl|shr|then|to|type|unit|until|uses|value|var|view|virtual|while|with|xor|string|handle|real|point|longint|integer|boolean|vector|structure|allocate|dynarray))\\b"
  },
  {
    "name": "constant.other.vectorscript",
    "match": "\\b(?i:())\\bk[A-Z0-9]\\w*\\b"
  },
  {
    "name": "support.function.vectorscript",
    "match": "\\b(?i:(Abs|Absolute|ActiveClass|ActLayer|ActSSheet|ActSymDef|Add3DPt|AddButton|AddCavity|AddChoiceItem|AddField|AddGroupBox|AddHelpItem|AddHole|AddLBImage|AddListBoxTabStop|AddPoint|AddResourceToList|AddSolid|AddSurface|AddSymToWall|AddSymToWallEdge|AddVectorFillLayer|AddVertex3D|AddVPAnnotationObject|AddWallBottomPeak|AddWallPeak|AlertCritical|AlertInform|AlertQuestion|AlignItemEdge|AlrtDialog|Ang2Vec|AngBVec|AngDialog|AngDialog3D|Angle|AngleVar|AngularDim|Append|AppendRoofEdge|Arc|ArcByCenter|ArcCos|ArcSin|ArcTan|ArcTo|Area|AreLBColumnLinesEnabled|AreLBRadioColumnLinesEnabled|AttachDefaultTextureSpace|AutoFitWSRowHeights|AutoKey|Backward|BeginColumn|BeginDialog|BeginFloor|BeginFolder|BeginGroup|BeginMesh|BeginMXtrd|BeginPoly|BeginPoly3D|BeginRoof|BeginSweep|BeginSym|BeginText|BeginVectorFillN|BeginXtrd|BotBound|BreakWall|BuildResourceList|CalcSurfaceArea|CalcVolume|CallTool|CapsLock|CellHasNum|CellHasStr|CellString|CellValue|Centroid3D|Chr|CircularDim|ClassList|ClassNum|ClearCavities|ClearGradientSliderSegments|ClearWallPeaks|ClearWSCell|ClipSurface|Close|ClosePoly|CloseSS|ClrDialog|ClrMessage|ColorIndexToRGB|CombineIntoSurface|Command|Comp|Concat|ContainsLight|ConvertTo3DPolys|ConvertToNURBS|ConvertToUnstyledWall|Copy|CopyMode|CopySymbol|Cos|Count|CreateBatDormer|CreateCheckBox|CreateCheckBoxGroupBox|CreateColorPopup|CreateCone|CreateContourCurves|CreateControl|CreateCustomObject|CreateCustomObjectN|CreateCustomObjectPath|CreateEditInteger|CreateEditReal|CreateEditText|CreateEditTextBox|CreateExtrudeAlongPath|CreateGableDormer|CreateGradient|CreateGroupBox|CreateHemisphere|CreateHipDormer|CreateImageFromPaint|CreateImageProp|CreateInterpolatedSurface|CreateLayer|CreateLayout|CreateLB|CreateLight|CreateLineAttributePopup|CreateLineStylePopup|CreateLineWeightPopup|CreateListBox|CreateListBoxN|CreateLoftSurfaces|CreateMarkerPopup|CreateNurbsCurve|CreateNurbsSurface|CreateOffsetNurbsObjectHandle|CreatePaintFromImage|CreatePatternPopup|CreatePullDownMenu|CreatePushButton|CreateRadioButton|CreateRadioButtonGroupBox|CreateResizableLayout|CreateRoof|CreateShaderRecord|CreateShedDormer|CreateSkylight|CreateSphere|CreateStandardIconControl|CreateStaticHatch|CreateStaticHatchFromObject|CreateStaticText|CreateSurfacefromCurvesNetwork|CreateSwapControl|CreateSwapPane|CreateSymbolDisplayControl|CreateTabControl|CreateTabPane|CreateTaperedExtrude|CreateText|CreateTexture|CreateTextureBitmap|CreateTextureBitmapN|CreateTrapeziumDormer|CreateVP|CreateWS|CreateWSImage|CrossProduct|CurveThrough|CurveTo|Date|Deg2Rad|DelChoice|DelClass|Delete|DeleteAllItems|DeleteAllLBItems|DeleteComponent|DeleteConstraint|DeleteLBColumn|DeleteLBItem|DeleteObjs|DeleteResourceFromList|DeleteTextureSpace|DeleteWallSym|DeleteWSColumns|DeleteWSRows|DelName|DelObject|DelRecord|DelVectorFill|DelVertex|DialogEvent|DidCancel|DimArcText|DimText|DisableModules|DisplayContextHelpOfCurrentPlugin|DisplayLayerScaleDialog|DisplayOrganizationDialog|DisplaySwapPane|DisplayTabPane|Distance|DistDialog|DoMenuText|DoMenuTextByName|DotProduct|DoubleFixedTolerance|DoubleTolerance|DoubLines|DrawDialog|DrawNurbsObject|DrwSize|DSelectAll|DSelectObj|Duplicate|EditShaderRecord|EditTexture|EditTextureBitmap|EditTextureSpace|EllipseEllipseIntersect|EnableLB|EnableLBClickAllDataChange|EnableLBColumnLines|EnableLBColumnTracking|EnableLBDragAndDrop|EnableLBRadioColumnLines|EnableLBSingleLineSelection|EnableLBSorting|EnableParameter|EndDialog|EndFolder|EndGroup|EndMesh|EndMXtrd|EndPoly|EndPoly3D|EndSweep|EndSym|EndText|EndVectorFill|EndXtrd|EnsureLBItemIsVisible|EOF|EOLN|EqualPt|EqualRect|Eval|EvalStr|EvaluateNurbsSurfacePointAndNormal|Exp|ExtendNurbsCurve|ExtendNurbsSurface|FActLayer|FFillBack|FFillColorByClass|FFillFore|FFillPat|FFPatByClass|Field|FillBack|FillColorByClass|FillFore|FillPat|FIn3D|FindFileInPluginFolder|FindLBColumnDataItem|FindLBColumnItem|FInFolder|FInGroup|FInLayer|FInSymDef|FLayer|FlipHor|FlipVer|FLSByClass|FLWByClass|FMarker|FMarkerByClass|FndError|FObject|ForEachObject|ForEachObjectInLayer|ForEachObjectInList|FormatTextDialog|Forward|FPatByClass|FPenBack|FPenColorByClass|FPenFore|FPenPat|FPenSize|FSActLayer|FSObject|FSymDef|Get2DPt|Get3DCntr|Get3DInfo|Get3DOrientation|GetActivePane|GetActiveSerialNumber|GetActualNameFromResourceList|GetArc|GetArrayDimensions|GetBatAttributes|GetBBox|GetBeamAngle|GetBinaryConstraint|GetCAlign|GetCellNum|GetCellStr|GetChoiceStr|GetClass|GetClassArrow|GetClassOptions|GetClFillBack|GetClFillFore|GetClFPat|GetClLS|GetClLW|GetClosestPt|GetClosestSide|GetClPenBack|GetClPenFore|GetClTextureC|GetClTextureD|GetClTextureG|GetClTextureL|GetClTextureR|GetClTextureT|GetClUseGraphic|GetClUseTexture|GetClVectorFill|GetColorButton|GetColorChoice|GetComponentFill|GetComponentPenStyles|GetComponentPenWeights|GetComponentWidth|GetControlData|GetCurrentMode|GetCustomObjectChoice|GetCustomObjectInfo|GetCustomObjectPath|GetCustomObjectProfileGroup|GetCVis|GetCWidth|GetDashStyle|GetDefaultTextSize|GetDialog|GetDimText|GetDocumentDefaultSketchStyle|GetDormerAttributes|GetDormerThick|GetDrawingSizeRect|GetEditInteger|GetEditReal|GetEnabledModules|GetField|GetFile|GetFileInfo|GetFillBack|GetFillFore|GetFillIAxisEndPoint|GetFillJAxisEndPoint|GetFillOriginPoint|GetFillPoints|GetFldName|GetFldType|GetFName|GetFolderPath|GetFontID|GetFontName|GetFPat|GetGableAttributes|GetGradientData|GetGradientMidpointPosition|GetGradientSliderData|GetGradientSliderSelectedMarker|GetGradientSpotColor|GetGradientSpotPosition|GetHipAttributes|GetHole|GetImagePopupObject|GetImagePopupObjectItemIndex|GetImagePopupSelectedItem|GetKeyDown|GetLastFileErr|GetLayer|GetLayerAmbientColor|GetLayerAmbientInfo|GetLayerByName|GetLayerElevation|GetLayerOptions|GetLayerRenderMode|GetLayoutDialogPosition|GetLayoutDialogSize|GetLBColumnDataItemInfo|GetLBColumnHeaderJust|GetLBColumnHeaderToolTip|GetLBColumnOwnerDrawnType|GetLBColumnSortState|GetLBColumnWidth|GetLBControlType|GetLBEditDisplayType|GetLBEventInfo|GetLBItemDashStyle|GetLBItemDisplayType|GetLBItemFillBackColor|GetLBItemFillForeColor|GetLBItemGradientOrImageRefNumber|GetLBItemInfo|GetLBItemPenBackColor|GetLBItemPenForeColor|GetLBItemTextColor|GetLBItemTextJust|GetLBItemTextStyle|GetLBMultImageIndexes|GetLBSortColumn|GetLightColorRGB|GetLightDirection|GetLightFalloff|GetLightInfo|GetLightLocation|GetLine|GetLineAttributeData|GetLineStyleChoice|GetLineWeightChoice|GetLName|GetLocalizedPluginChoice|GetLocalizedPluginName|GetLocalizedPluginParameter|GetLocPt|GetLocus3D|GetLS|GetLScale|GetLVis|GetLW|GetMarker|GetMarkerChoice|GetMarkerPopupSelectedItem|GetMouse|GetName|GetNameFromResourceList|GetNumberOfComponents|GetNumGradientSegments|GetNumGradientSliderSegments|GetNumHoles|GetNumImagePopupItems|GetNumLBColumnDataItems|GetNumLBColumns|GetNumLBItems|GetNumRoofElements|GetNumSelectedLBItems|GetNumWallPeaks|GetNurbsObjectDistanceFromPoint|GetObjArrow|GetObject|GetObjectVariableBoolean|GetObjectVariableHandle|GetObjectVariableInt|GetObjectVariableLongInt|GetObjectVariableReal|GetObjectVariableString|GetObjExpandTexture|GetOrigin|GetOSVersion|GetPaletteVisibility|GetParameterOnNurbsCurve|GetParent|GetPatternData|GetPenBack|GetPenFore|GetPickObjectInfo|GetPluginChoiceIndex|GetPluginInfo|GetPluginString|GetPointAndParameterOnNurbsCurveAtGivenLength|GetPolylineVertex|GetPolyPt|GetPolyPt3D|GetPref|GetPrefInt|GetPrefLongInt|GetPrefReal|GetPrefString|GetPrimaryUnitInfo|GetProduct|GetPt|GetPtL|GetRecord|GetRect|GetResourceFromList|GetResourceString|GetRField|GetRoofAttributes|GetRoofEdge|GetRoofElementType|GetRoofFaceAttrib|GetRoofFaceCoords|GetRoofVertices|GetRoundingBase|GetRRDiam|GetSavedSetting|GetScreen|GetSDName|GetSecondaryUnitInfo|GetSegPt1|GetSegPt2|GetSelChoice|GetShaderRecord|GetShedAttributes|GetSheetLayerUserOrigin|GetSingularConstraint|GetSkylight|GetSprdSortSum|GetSprdSortSumColumns|GetSpreadAngle|GetSymbolOptionsN|GetSymbolType|GetSymBrightMult|GetSymLoc|GetSymLoc3D|GetSymName|GetSymRot|GetTexBFeatureEnd|GetTexBFeatureStart|GetTexBitFeatureSize|GetTexBitmapOrigin|GetTexBitPaintNode|GetTexBitRepHoriz|GetTexBitRepVert|GetTexSpace2DOffset|GetTexSpace2DRadius|GetTexSpace2DRot|GetTexSpace2DScale|GetTexSpaceEndCap|GetTexSpaceKind|GetTexSpaceOrientU|GetTexSpaceOrientV|GetTexSpaceOrientW|GetTexSpaceOrigin|GetTexSpacePartID|GetTexSpaceStartCap|GetText|GetTextFont|GetTextJust|GetTextLeading|GetTextLength|GetTextOrientation|GetTextSize|GetTextSpace|GetTextStyle|GetTextureBitmap|GetTextureRef|GetTextureShader|GetTextureShininess|GetTextureSize|GetTextureSpace|GetTextureTransp|GetTextVerticalAlign|GetTextWidth|GetTextWrap|GetTickCount|GetTopVisibleWS|GetTrapeziumAttributes|GetType|GetUnits|GetVCenter|GetVectorFill|GetVectorFillDefault|GetVersion|GetVertexVisibility|GetVertNum|GetView|GetViewMatrix|GetVPClassVisibility|GetVPCropObject|GetVPGroup|GetVPGroupParent|GetVPLayerVisibility|GetWallControlOffset|GetWallPeak|GetWallPrefStyle|GetWallStyle|GetWallThickness|GetWallWidth|GetWorkingPlane|GetWSCellAlignment|GetWSCellBorder|GetWSCellFill|GetWSCellFormula|GetWSCellNumberFormat|GetWSCellString|GetWSCellTextAngle|GetWSCellTextColor|GetWSCellTextFormat|GetWSCellValue|GetWSCellVertAlignment|GetWSCellWrapTextFlag|GetWSColumnOperators|GetWSColumnWidth|GetWSFromImage|GetWSImage|GetWSPlacement|GetWSRowColumnCount|GetWSRowHeight|GetWSRowHLockState|GetWSSelection|GetWSSubrowCellString|GetWSSubrowCellValue|GetWSSubrowCount|GetZoom|GetZVals|GrayClass|GrayLayer|GridLines|Group|GroupToMesh|HAngle|HArea|HasConstraint|HasDim|HasPlugin|HCenter|HDuplicate|Height|HExtrude|HHeight|Hide|HideClass|HideLayer|HLength|HMove|HMoveBackward|HMoveForward|HPerim|HRotate|HUngroup|HWallHeight|HWallWidth|HWidth|ImportResourceToCurrentFile|Index2Name|Insert|InsertChoice|InsertGradientSegment|InsertGradientSliderSegment|InsertImagePopupObjectItem|InsertImagePopupResource|InsertLBColumn|InsertLBColumnDataItem|InsertLBItem|InsertNewComponent|InsertSymbol|InsertSymbolInFolder|InsertVertex|InsertWSColumns|InsertWSRows|IntDialog|IntersectSolid|IntersectSurface|IsFillColorByClass|IsFlipped|IsFPatByClass|IsLayerReferenced|IsLBColumnTrackingEnabled|IsLBItemSelected|IsLBSortingEnabled|IsLSByClass|IsLWByClass|IsMarkerByClass|IsNewCustomObject|IsObjectFlipped|IsPenColorByClass|IsPluginFormat|IsRW|IsTextureableObject|IsValidWSCell|IsValidWSRange|IsValidWSSubrowCell|IsVPGroupContainedObject|IsWSCellNumber|IsWSCellString|IsWSDatabaseRow|IsWSSubrowCellNumber|IsWSSubrowCellString|IsWSVisible|ItemSel|JoinWalls|KeyDown|LActLayer|Layer|LayerRef|LckObjs|LeftBound|Len|Length|LFillBack|LFillFore|LimitTolerance|Line|LinearDim|LineEllipseIntersect|LineLineIntersection|LineTo|LinkText|LLayer|Ln|LNewObj|LoadCell|LObject|Locus|Locus3D|LPenBack|LPenFore|LSActLayer|LSByClass|LWByClass|MakePolygon|MakePolyline|Marker|MarkerByClass|MeshToGroup|Message|MirrorXY3D|Moments3D|MouseDown|Move|Move3D|Move3DObj|MoveBack|MoveFront|MoveObjs|MoveTo|MoveWallByOffset|Name2Index|NameClass|NameList|NameNum|NameObject|NameUndoEvent|NewField|NewSprdSheet|NextDObj|NextLayer|NextObj|NextSObj|NextSymDef|NoAngleVar|NonUndoableActionOK|Norm|Num2Str|Num2StrF|NumChoices|NumCustomObjectChoices|NumDashStyles|NumFields|NumLayers|NumObj|NumRecords|NumSObj|NumVectorFills|NurbsCurveEvalPt|NurbsCurveGetNumPieces|NurbsCurveType|NurbsDegree|NurbsDelVertex|NurbsGetNumPts|NurbsGetPt3D|NurbsGetWeight|NurbsKnot|NurbsNumKnots|NurbsSetKnot|NurbsSetPt3D|NurbsSetWeight|NurbsSurfaceEvalPt|ObjectType|Open|OpenPoly|OpenURL|Option|Ord|Oval|PenBack|PenColorByClass|PenFore|PenGrid|PenLoc|PenPat|PenSize|Perim|Perp|PickObject|Poly|Poly3D|PopAttrs|Pos|PrevDObj|PrevLayer|PrevObj|PrevSObj|PrevSymDef|PrimaryUnits|PrintUsingPrintDialog|PrintWithoutUsingPrintDialog|Products3D|Projection|PtDialog|PtDialog3D|PtInPoly|PtInRect|PushAttrs|PutFile|QTCloseMovieFile|QTGetMovieOptions|QTInitialize|QTOpenMovieFile|QTSetMovieOptions|QTTerminate|QTWriteFrame|Rad2Deg|Random|Read|ReadLn|RealDialog|RecalculateWS|Record|Rect|ReDraw|ReDrawAll|RefreshLB|Relative|RemoveAllImagePopupItems|RemoveAllLBColumnDataItems|RemoveGradientSegment|RemoveGradientSliderSegment|RemoveImagePopupItem|RemoveLBColumnDataItem|RemoveListBoxTabStop|RemoveRoofEdge|RemoveRoofElement|RenameClass|ResetBBox|ResetObject|ResetOrientation3D|ResolveByClassTextureRef|ResourceListSize|ReverseWallSides|RevolveWithRail|Rewrite|RGBToColorIndex|RightBound|Rotate|Rotate3D|RotatePoint|Round|RoundWall|RRect|Run|RunLayoutDialog|SaveSheet|Scale|SecondaryUnits|SelChoice|SelectAll|Selected|SelectObj|SelectSS|SelField|Set3DInfo|Set3DRot|SetActSymbol|SetArc|SetBatAttributes|SetBBox|SetBeamAngle|SetBelowItem|SetBinaryConstraint|SetClass|SetClassArrow|SetClassOptions|SetClFillBack|SetClFillFore|SetClFPat|SetClLS|SetClLW|SetClPenBack|SetClPenFore|SetClTextureC|SetClTextureD|SetClTextureG|SetClTextureL|SetClTextureR|SetClTextureT|SetClUseGraphic|SetClUseTexture|SetClVectorFill|SetColorButton|SetColorChoice|SetComponentFill|SetComponentPenStyles|SetComponentPenWeights|SetComponentWidth|SetConstrain|SetConstraintValue|SetControlData|SetControlText|SetCurrentObject|SetCursor|SetCustomObjectPath|SetCustomObjectProfileGroup|SetDashStyle|SetDefaultTextureSpace|SetDimStd|SetDimText|SetDocumentDefaultSketchStyle|SetDormerAttributes|SetDormerThick|SetDrawingRect|SetDSelect|SetEdgeBinding|SetEditInteger|SetEditReal|SetField|SetFillBack|SetFillColorByClass|SetFillFore|SetFillIAxisEndPoint|SetFillJAxisEndPoint|SetFillOriginPoint|SetFirstGroupItem|SetFirstLayoutItem|SetFocusOnLB|SetFPat|SetFPatByClass|SetGableAttributes|SetGradientData|SetGradientMidpointPosition|SetGradientSliderData|SetGradientSliderSelectedMarker|SetGradientSpotColor|SetGradientSpotPosition|SetHDef|SetHelpString|SetHipAttributes|SetImagePopupSelectedItem|SetItem|SetItemEnable|SetLayerAmbientColor|SetLayerAmbientInfo|SetLayerElevation|SetLayerOptions|SetLayerRenderMode|SetLayerTransparency|SetLayoutDialogPosition|SetLayoutDialogSize|SetLayoutOption|SetLBColumnHeaderJust|SetLBColumnHeaderToolTip|SetLBColumnOwnerDrawnType|SetLBColumnWidth|SetLBControlType|SetLBDragDropColumn|SetLBEditDisplayType|SetLBItemDashStyle|SetLBItemDisplayType|SetLBItemFillBackColor|SetLBItemFillForeColor|SetLBItemGradientOrImageRefNumber|SetLBItemInfo|SetLBItemPenBackColor|SetLBItemPenForeColor|SetLBItemTextColor|SetLBItemTextJust|SetLBItemTextStyle|SetLBItemUsingColumnDataItem|SetLBMultImageIndexes|SetLBSelection|SetLBSortColumn|SetLightColorRGB|SetLightDirection|SetLightFalloff|SetLightInfo|SetLightLocation|SetLineAttributeData|SetLineStyleChoice|SetLineWeightChoice|SetLS|SetLSByClass|SetLScale|SetLW|SetLWByClass|SetMarker|SetMarkerByClass|SetMarkerChoice|SetMaximumUndoEvents|SetName|SetObjArrow|SetObjectVariableBoolean|SetObjectVariableHandle|SetObjectVariableInt|SetObjectVariableLongInt|SetObjectVariableReal|SetObjectVariableString|SetObjExpandTexture|SetOrigin|SetOriginAbsolute|SetPaletteVisibility|SetParameterVisibility|SetParent|SetPatternData|SetPenBack|SetPenColorByClass|SetPenFore|SetPolylineVertex|SetPolyPt|SetPolyPt3D|SetPref|SetPrefInt|SetPrefLongInt|SetPrefReal|SetPrefString|SetPrimaryDim|SetProportionalBinding|SetRecord|SetRField|SetRightItem|SetRoofAttributes|SetRoofEdge|SetRot3D|SetSavedSetting|SetScale|SetSecondaryDim|SetSegPt1|SetSegPt2|SetSelect|SetShedAttributes|SetSheetLayerUserOrigin|SetSingularConstraint|SetSkylight|SetSprdSortSum|SetSprdSortSumColumns|SetSpreadAngle|SetSymbolOptionsN|SetSymBrightMult|SetTexBFeatureEnd|SetTexBFeatureStart|SetTexBitFeatureSize|SetTexBitmapOrigin|SetTexBitPaintNode|SetTexBitRepHoriz|SetTexBitRepVert|SetTexSpace2DOffset|SetTexSpace2DRadius|SetTexSpace2DRot|SetTexSpace2DScale|SetTexSpaceEndCap|SetTexSpaceKind|SetTexSpaceOrientU|SetTexSpaceOrientV|SetTexSpaceOrientW|SetTexSpaceOrigin|SetTexSpacePartID|SetTexSpaceStartCap|SetText|SetTextEditable|SetTextFont|SetTextJust|SetTextLeading|SetTextOrientation|SetTextSize|SetTextSpace|SetTextStyle|SetTextureBitmap|SetTextureRef|SetTextureShader|SetTextureShininess|SetTextureSize|SetTextureTransp|SetTextVerticalAlign|SetTextWidth|SetTextWrap|SetTitle|SetTool|SetTopVisibleWS|SetTrapeziumAttributes|SetUnits|SetVCenter|SetVectorFill|SetVectorFillDefault|SetVertexVisibility|SetView|SetViewMatrix|SetViewVector|SetVPClassVisibility|SetVPCropObject|SetVPLayerVisibility|SetVSResourceFile|SetWallControlOffset|SetWallHeights|SetWallPrefStyle|SetWallThickness|SetWallWidth|SetWorkingPlane|SetWSCellAlignment|SetWSCellBorder|SetWSCellBorders|SetWSCellFill|SetWSCellFormula|SetWSCellNumberFormat|SetWSCellTextColor|SetWSCellTextFormat|SetWSCellVertAlignment|SetWSCellWrapTextFlag|SetWSColumnOperators|SetWSColumnWidth|SetWSCurrentCell|SetWSPlacement|SetWSRowHeight|SetWSSelection|SetWSTextAngle|SetZoom|SetZVals|SheetList|SheetNum|Shift|Show|ShowClass|ShowCreateImageDialog|ShowGradientEditorDialog|ShowItem|ShowLayer|ShowWS|ShowWSDialog|Sin|SingleTolerance|Smooth|SortArray|Space|SprdAlign|SprdBorder|SprdFormat|SprdSize|SprdWidth|Sqr|Sqrt|SrndArea|StdRead|StdReadLn|Str2Num|StrDialog|SubtractSolid|SurfaceArea|Symbol|SymbolToGroup|SymDefNum|SysBeep|Tab|Tan|TargetSprdSheet|TextFace|TextFlip|TextFont|TextJust|TextLeading|TextOrigin|TextRotate|TextSize|TextSpace|TextVerticalAlign|TopBound|Trunc|UndoOff|Ungroup|UnionRect|Units|UnitVec|UnLckObjs|UpdateSymbolDisplayControl|UpdateThumbnailPreview|UpdateVP|UprString|UseDefaultFileErrorHandling|ValidAngStr|ValidNumStr|VDelete|Vec2Ang|VectorFillList|VerifyLayout|VerifyLibraryRoutine|Volume|VPHasCropObject|VRestore|VSave|Wait|Wall|WallCap|WallFootPrint|WallHeight|WallPeak|WallTo|WallWidth|Width|Write|WriteLn|WriteLnMac|WriteMac|XCenter|YCenter|YNDialog))\\b"
  },
  {
    "name": "support.function.vectorscript.undocumented",
    "match": "\\b(?i:(SetObjPropCharVS|vsoInsertAllParams|vsoGetEventInfo))\\b"
  },
  {
    "name": "meta.function.vectorscript",
    "captures": {
      "1": {
        "name": "storage.type.function.vectorscript"
      },
      "2": {
        "name": "storage.type.procedure.vectorscript"
      },
      "3": {
        "name": "entity.name.function.vectorscript"
      }
    },
    "match": "\\b(?i:(?:(function)|(procedure)))\\b\\s+(\\w+)"
  },
  {
    "name": "constant.character.parameter.vectorscript",
    "match": "\\bp[A-Z_0-9]+\\b"
  },
  {
    "name": "variable.other.readwrite.global.vectorscript",
    "match": "\\bg[A-Z_0-9]\\w*\\b"
  },
  {
    "name": "constant.language.boolean.vectorscript",
    "match": "\\b(?i:(true|false))\\b"
  },
  {
    "name": "comment.block.vectorscript",
    "begin": "\\(\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.vectorscript"
      }
    },
    "end": "\\*\\)"
  },
  {
    "name": "comment.block.vectorscript",
    "begin": "\\{",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.vectorscript"
      }
    },
    "end": "\\}"
  },
  {
    "name": "string.quoted.single.vectorscript",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.vectorscript"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.vectorscript"
      }
    },
    "end": "'",
    "patterns": [
      {
        "name": "constant.character.escape.vectorscript",
        "match": "\\\\."
      }
    ]
  }
];

exports.VectorscriptSyntax = new TextmateSyntax(repositories, patterns);
