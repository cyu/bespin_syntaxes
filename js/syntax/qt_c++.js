"define metadata";
({
    "description": "Qt C++ syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "cpp",
            "pointer": "#Qt C++Syntax",
            "fileexts": [
  "cpp",
  "h"
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
    "name": "support.other.macro.qt",
    "match": "\\bQ_(CLASSINFO|ENUMS|FLAGS|INTERFACES|OBJECT|PROPERTY)\\b"
  },
  {
    "name": "support.function.qt",
    "match": "\\b((dis)?connect|emit|fore(ach|ver)|tr(Utf8)?|qobject_cast)\\b"
  },
  {
    "name": "support.class.qt",
    "match": "\\bQ(Abstract(Button|EventDispatcher|Extension(Factory|Manager)|FileEngine(Handler)?|FormBuilder|GraphicsShapeItem|Item(Delegate|Model|View)|ListModel|PrintDialog|ProxyModel|ScrollArea|Slider|Socket|SpinBox|TableModel|TextDocumentLayout)|Accessible(Bridge|BridgePlugin|Event|Interface|Object|Plugin|Widget)?|Action(Event|Group)?|(Core)?Application|AssistantClient|Ax(Aggregated|Base|Bindable|Factory|Object|Script|ScriptEngine|ScriptManager|Widget)|BasicTimer|Bit(Array|map)|BoxLayout|Brush|Buffer|ButtonGroup|ByteArray(Matcher)?|(CDE|Windows(XP)?|Cleanlooks|Common|Mac|Plastique|Motif)Style|Cache|CalendarWidget|Char|CheckBox|ChildEvent|Clipboard|CloseEvent|Color(Dialog|map)?|ComboBox|Completer|ConicalGradient|ContextMenuEvent|CopChannel|Cursor|CustomRasterPaintDevice|DBus(AbstractAdaptor|AbstractInterface|Argument|Connection(Interface)?|Error|Interface|Message|ObjectPath|Reply|Server|Signature|Variant)|Data(Stream|WidgetMapper)|Date((Time)?(Edit)?)|Decoration(Factory|Plugin)?|Designer(ActionEditorInterface|ContainerExtension|CustomWidgetCollectionInterface|CustomWidgetInterface|FormEditorInterface|FormWindowCursorInterface|FormWindowInterface|FormWindowManagerInterface|MemberSheetExtension|ObjectInspectorInterface|PropertyEditorInterface|PropertySheetExtension|TaskMenuExtension|WidgetBoxInterface)|Desktop(Services|Widget)|Dial(og|ogButtonBox)?|Dir(Model|ectPainter)?|DockWidget|Dom(Attr|CDATASection|CharacterData|Comment|Document|DocumentFragment|DocumentType|Element|Entity|EntityReference|Implementation|NamedNodeMap|Node|NodeList|Notation|ProcessingInstruction|Text)|Double(SpinBox|Validator)|Drag((Enter|Leave|Move)Event)?|(Drop|DynamicPropertyChange)Event|ErrorMessage|Event(Loop)?|Extension(Factory|Manager)|FSFileEngine|File(Dialog|IconProvider|Info|OpenEvent|SystemWatcher)?|Flags?|Focus(Event|Frame)|Font(ComboBox|Database|Dialog|Info|MetricsF?)?|FormBuilder|Frame|Ftp|GL(Colormap|Context|Format|FramebufferObject|PixelBuffer|Widget)|Generic(Return)?Argument|Gradient|Graphics(EllipseItem|Item|ItemAnimation|ItemGroup|LineItem|PathItem|PixmapItem|PolygonItem|RectItem|Scene((ContextMenu|Hover|Mouse|Wheel)?Event)?|SimpleTextItem|SvgItem|TextItem|View)|GridLayout|GroupBox|HBoxLayout|Hash(Iterator)?|HeaderView|(Help|Hide|Hover)Event|Host(Address|Info)|Http((Response|Request)?Header)?|IODevice|Icon(DragEvent|Engine(Plugin)?)?|Image(IO(Handler|Plugin)|Reader|Writer)?|Input(Context(Factory|Plugin)?|Dialog|Event|MethodEvent)|IntValidator|Item(Delegate|Editor(CreatorBase|Factory)|Selection(Model|Range)?)|KbdDriver(Factory|Plugin)|Key(Event|Sequence)|LCDNumber|Label|Latin1(Char|String)|Layout(Item)?|Library(Info)?|Line(Edit|F)?|LinearGradient|LinkedList(Iterator)?|LinuxFbScreen|List(View|Iterator|Widget(Item)?)?|Locale|MacPasteboardMime|MainWindow|Map(Iterator)?|Matrix|Menu(Bar)?|MessageBox|Meta(ClassInfo|Enum|Method|Object|Property|Type)|Mime(Data|Source)|ModelIndex|MouseDriver(Factory|Plugin)|(Move|Mouse)Event|Movie|Multi(Hash|Map)|Mutable(Hash|(Linked)?List|Map|Set|Vector)Iterator|Mutex(Locker)?|Network(AddressEntry|Interface|Proxy)|Object(CleanupHandler)?|PageSetupDialog|Paint(Device|Engine(State)?|Event|er(Path(Stroker)?)?)|Pair|Palette|Pen|PersistentModelIndex|Picture(FormatPlugin|IO)?|Pixmap(Cache)?|PluginLoader|PointF?|Pointer|PolygonF?|Print(Dialog|Engine|er)|Process|Progress(Bar|Dialog)|ProxyModel|PushButton|Queue|RadialGradient|RadioButton|RasterPaintEngine|ReadLocker|ReadWriteLock|RectF?|RegExp(Validator)?|Region|ResizeEvent|Resource|RubberBand|Screen(Cursor|Driver(Factory|Plugin))?|Scroll(Area|Bar)|Semaphore|SessionManager|Set(Iterator)?|Settings|SharedData(Pointer)?|Shortcut(Event)?|ShowEvent|Signal(Mapper|Spy)|Size(Grip|Policy|F)?|Slider|SocketNotifier|SortFilterProxyModel|Sound|SpacerItem|SpinBox|SplashScreen|Splitter(Handle)?|Sql(Database|Driver(Creator(Base)?|Plugin)?|Error|Field|Index|Query(Model)?|Record|Relation|Relational(Delegate|TableModel)|Result|TableModel)|Stack(ed(Layout|Widget))?|StandardItem(EditorCreator|Model)?|Status(Bar|TipEvent)|String(List(Model)?|Matcher)?|Style(Factory|HintReturn(Mask)?|Option(Button|ComboBox|Complex|DockWidget|FocusRect|Frame(V2)?|GraphicsItem|GroupBox|Header|MenuItem|ProgressBar(V2)?|Q3(DockWindow|ListView|ListViewItem)|RubberBand|SizeGrip|Slider|SpinBox|Tab(BarBase|V2|WidgetFrame)?|TitleBar|Tool(Bar|Box|Button)|ViewItem(V2)?)?|Painter|Plugin)?|Svg(Renderer|Widget)|SyntaxHighlighter|SysInfo|System(Locale|TrayIcon)|Tab(Bar|Widget)|Table(Widget(Item|SelectionRange)?|View)|TabletEvent|Tcp(Server|Socket)|TemporaryFile|TestEventList|Text(Block(Format|Group|UserData)?|Browser|CharFormat|Codec(Plugin)?|Cursor|(De|En)coder|Document(Fragment)?|Edit|Fragment|Frame(Format)?|(Image)?Format|InlineObject|Layout|Length|Line|List(Format)?|Object|Option|Stream|Table(Cell|Format)?)|Thread(Storage)?|Time(Edit|Line)?|Timer(Event)?|Tool(Bar|Box|Button|Tip)|TransformedScreen|Translator|Tree(Widget(Item(Iterator)?)?|View)|UdpSocket|UiLoader|Undo(Command|Group|Stack|View)|Url(Info)?|Uuid|VBoxLayout|(VNC|VFb)Screen|Validator|VarLengthArray|Variant|Vector(Iterator)?|WS(Client|EmbedWidget|Event|InputMethod|(Keyboard|(Tslib|Calibrated)?Mouse)Handler|PointerCalibrationData|ScreenSaver|Server|Window(Surface)?)|WaitCondition|WhatsThis(ClickedEvent)?|WheelEvent|Widget(Action|Item)?|Window(StateChangeEvent|sMime)|Workspace|WriteLocker|X11Embed(Container|Widget)|X11Info|Xml(Attributes|(Content|DTD|Decl|Default|Error|Lexical)Handler|EntityResolver|InputSource|Locator|NamespaceSupport|ParseException|Reader|SimpleReader))\\b"
  },
  {
    "name": "storage.type.qt",
    "match": "\\b(q(int8|int16|int32|int64|longlong|real|uint8|uint16|uint32|uint64|ulonglong)|u(char|int|long|short))\\b"
  },
  {
    "name": "storage.modifier.qt",
    "match": "\\b(slots|signals)\\b"
  },
  {
    "include": "source.c++"
  }
];

exports.Qt C++Syntax = new TextmateSyntax(repositories, patterns);
