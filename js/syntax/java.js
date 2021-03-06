"define metadata";
({
    "description": "Java syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "java",
            "pointer": "#JavaSyntax",
            "fileexts": [
  "java",
  "bsh"
]
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = {
  "all-types": {
    "patterns": [
      {
        "include": "#support-type-built-ins-java"
      },
      {
        "include": "#support-type-java"
      },
      {
        "include": "#storage-type-java"
      }
    ]
  },
  "comments": {
    "patterns": [
      {
        "name": "comment.block.java",
        "begin": "/\\*",
        "captures": {
          "0": {
            "name": "punctuation.definition.comment.java"
          }
        },
        "end": "\\*/"
      },
      {
        "name": "comment.line.double-slash.java",
        "captures": {
          "1": {
            "name": "punctuation.definition.comment.java"
          }
        },
        "match": "(//).*$\\n?"
      }
    ]
  },
  "support-type-built-ins-java": {
    "name": "support.type.built-ins.java",
    "match": "\\b(R(GBImageFilter|MI(S(ocketFactory|e(curity(Manager|Exception)|rver(SocketFactory|Impl(_Stub)?)?))|C(onnect(ion(Impl(_Stub)?)?|or(Server)?)|l(ientSocketFactory|assLoader(Spi)?))|IIOPServerImpl|JRMPServerImpl|FailureHandler)|SA(MultiPrimePrivateCrtKey(Spec)?|OtherPrimeInfo|P(ublicKey(Spec)?|rivate(CrtKey(Spec)?|Key(Spec)?))|Key(GenParameterSpec)?)|o(otPane(Container|UI)|und(Rectangle2D|ingMode)|w(Mapper|Set(Reader|MetaData(Impl)?|Internal|Event|W(arning|riter)|Listener)?)|le(Result|Status|NotFoundException|Info(NotFoundException)?|Unresolved(List)?|List)?|bot)|dn|C(2ParameterSpec|5ParameterSpec)|u(n(nable|time(M(XBean|BeanException)|OperationsException|Permission|E(rrorException|xception))?)|leBasedCollator)|TFEditorKit|e(s(caleOp|o(urceBundle|l(utionSyntax|ve(Result|r)))|ult(Set(MetaData)?)?|ponseCache)|nder(ingHints|Context|e(dImage(Factory)?|r)|ableImage(Op|Producer)?)|c(tang(ularShape|le(2D)?)|eiver)|tention(Policy)?|jectedExecution(Handler|Exception)|p(licateScaleFilter|aintManager)|entrant(ReadWriteLock|Lock)|verbType|qu(iredModelMBean|estingUserName)|f(er(ence(UriSchemesSupported|able|Queue)?|ralException)|lect(ionException|Permission)|resh(able|FailedException)|Addr)?|lation(S(upport(MBean)?|ervice(MBean|NotRegisteredException)?)|Not(ification|FoundException)|Type(Support|NotFoundException)?|Exception)?|a(d(er|OnlyBufferException|able(ByteChannel)?|WriteLock)|lmC(hoiceCallback|allback))|gi(st(erableService|ry(Handler)?)|on)|mote(Ref|S(tub|erver)|Call|Object(InvocationHandler)?|Exception)?)|a(ster(Op|FormatException)?|ndom(Access(File)?)?))|G(uard(edObject)?|ener(ic(SignatureFormatError|Declaration|ArrayType)|al(SecurityException|Path))|ZIP(InputStream|OutputStream)|lyph(Metrics|JustificationInfo|V(iew|ector))|a(theringByteChannel|ugeMonitor(MBean)?|pContent|rbageCollectorMXBean)|r(id(Bag(Constraints|Layout)|Layout)|oup|egorianCalendar|a(yFilter|dientPaint|phic(s(2D|Config(uration|Template)|Device|Environment)?|Attribute))))|X(ML(GregorianCalendar|Constants|Decoder|ParseException|Encoder|Formatter)|id|Path(Constants|Ex(ception|pression(Exception)?)|VariableResolver|F(unction(Resolver|Exception)?|actory(ConfigurationException)?))?|50(9(C(RL(Selector|Entry)?|ert(ificate|Selector))|TrustManager|E(ncodedKeySpec|xten(sion|dedKeyManager))|KeyManager)|0Pri(ncipal|vateCredential))|ml(Reader|Writer)|A(Resource|Connection|DataSource|Exception))|M(GF1ParameterSpec|Bean(Registration(Exception)?|Server(Builder|Notification(Filter)?|Connection|InvocationHandler|Delegate(MBean)?|Permission|F(orwarder|actory))?|NotificationInfo|ConstructorInfo|TrustPermission|Info|OperationInfo|P(ermission|arameterInfo)|Exception|FeatureInfo|AttributeInfo)|i(ssing(ResourceException|Format(WidthException|ArgumentException))|nimalHTMLWriter|di(Message|System|Channel|Device(Provider)?|UnavailableException|Event|File(Reader|Format|Writer))|xer(Provider)?|meTypeParseException)|o(nitor(MBean|SettingException|Notification)?|d(ifi(cationItem|er)|elMBean(Notification(Broadcaster|Info)|ConstructorInfo|Info(Support)?|OperationInfo|AttributeInfo)?)|use(Motion(Listener|Adapter)|In(put(Listener|Adapter)|fo)|DragGestureRecognizer|Event|Wheel(Event|Listener)|Listener|Adapter))|u(table(ComboBoxModel|TreeNode|AttributeSet)|lti(RootPaneUI|castSocket|Menu(BarUI|ItemUI)|ButtonUI|S(croll(BarUI|PaneUI)|p(innerUI|litPaneUI)|eparatorUI|liderUI)|Co(lorChooserUI|mboBoxUI)|T(ool(BarUI|TipUI)|extUI|ab(le(HeaderUI|UI)|bedPaneUI)|reeUI)|InternalFrameUI|ple(Master|DocumentHandling)|OptionPaneUI|D(oc(Print(Service|Job))?|esktop(IconUI|PaneUI))|P(ixelPackedSampleModel|opupMenuUI|anelUI|rogressBarUI)|ViewportUI|FileChooserUI|L(istUI|ookAndFeel|abelUI)))|e(ssage(Digest(Spi)?|Format)|nu(Bar(UI)?|S(hortcut|electionManager)|Co(ntainer|mponent)|Item(UI)?|DragMouse(Event|Listener)|E(vent|lement)|Key(Event|Listener)|Listener)?|t(hod(Descriptor)?|a(Message|EventListener|l(R(ootPaneUI|adioButtonUI)|MenuBarUI|B(orders|uttonUI)|S(croll(B(utton|arUI)|PaneUI)|plitPaneUI|eparatorUI|liderUI)|C(heckBox(Icon|UI)|omboBox(Button|Icon|UI|Editor))|T(heme|o(ol(BarUI|TipUI)|ggleButtonUI)|extFieldUI|abbedPaneUI|reeUI)|I(nternalFrame(TitlePane|UI)|conFactory)|DesktopIconUI|P(opupMenuSeparatorUI|rogressBarUI)|FileChooserUI|L(ookAndFeel|abelUI))))|dia(Size(Name)?|Name|Tra(y|cker)|PrintableArea)?|m(ory(M(XBean|anagerMXBean)|Handler|NotificationInfo|CacheImage(InputStream|OutputStream)|Type|ImageSource|Usage|PoolMXBean)|ber))|a(skFormatter|n(ifest|age(ReferralControl|rFactoryParameters|ment(Permission|Factory)))|c(Spi)?|t(h(Context)?|ch(Result|er)|teBorder)|p(pedByteBuffer)?|lformed(InputException|ObjectNameException|URLException|ParameterizedTypeException|LinkException)|rshal(Exception|ledObject))|Let(MBean)?)|B(yte(Buffer|Channel|Order|LookupTable|Array(InputStream|OutputStream))?|MPImageWriteParam|i(n(d(ing|Exception)|aryRefAddr)|tSet|di|g(Integer|Decimal))|o(o(k|lean(Control)?)|undedRangeModel|rder(UIResource|Factory|Layout)?|x(View|Layout)?)|u(tton(Group|Model|UI)?|ffer(Strategy|Capabilities|ed(Reader|I(nputStream|mage(Op|Filter)?)|OutputStream|Writer)|OverflowException|UnderflowException)?)|e(velBorder|an(s|Context(Membership(Event|Listener)|S(upport|ervice(s(Support|Listener)?|Revoked(Event|Listener)|Provider(BeanInfo)?|AvailableEvent))|C(hild(Support|ComponentProxy)?|ontainerProxy)|Proxy|Event)?|Info|Descriptor))|lo(ck(ingQueue|View)|b)|a(s(ic(R(ootPaneUI|adioButton(MenuItemUI|UI))|GraphicsUtils|Menu(BarUI|ItemUI|UI)|B(orders|utton(UI|Listener))|S(croll(BarUI|PaneUI)|troke|p(innerUI|litPane(Divider|UI))|eparatorUI|liderUI)|HTML|C(heckBox(MenuItemUI|UI)|o(ntrol|lorChooserUI|mbo(Box(Renderer|UI|Editor)|Popup)))|T(o(ol(Bar(SeparatorUI|UI)|TipUI)|ggleButtonUI)|ext(UI|PaneUI|FieldUI|AreaUI)|ab(le(HeaderUI|UI)|bedPaneUI)|reeUI)|I(nternalFrame(TitlePane|UI)|conFactory)|OptionPaneUI|D(irectoryModel|esktop(IconUI|PaneUI))|P(opupMenu(SeparatorUI|UI)|ermission|a(sswordFieldUI|nelUI)|rogressBarUI)|EditorPaneUI|ViewportUI|F(ileChooserUI|ormattedTextFieldUI)|L(istUI|ookAndFeel|abelUI)|A(ttribute(s)?|rrowButton))|eRowSet)|nd(CombineOp|edSampleModel)|ckingStoreException|tchUpdateException|d(BinaryOpValueExpException|StringOperationException|PaddingException|LocationException|AttributeValueExpException))|r(okenBarrierException|eakIterator))|S(slRMI(ServerSocketFactory|ClientSocketFactory)|h(ort(Message|Buffer(Exception)?|LookupTable)?|eetCollate|ape(GraphicAttribute)?)|y(s(tem(Color|FlavorMap)?|exMessage)|n(c(hronousQueue|Resolver|Provider(Exception)?|Fa(ctory(Exception)?|iledException))|th(GraphicsUtils|Style(Factory)?|Con(stants|text)|esizer|Painter|LookAndFeel)))|c(he(duled(ThreadPoolExecutor|ExecutorService|Future)|ma(ViolationException|Factory(Loader)?)?)|a(nner|tteringByteChannel)|roll(BarUI|Pane(Constants|UI|Layout|Adjustable)?|able|bar))|t(yle(Sheet|d(Document|EditorKit)|Con(stants|text))?|ub(NotFoundException|Delegate)?|a(ndardMBean|ck(TraceElement|OverflowError)?|te(Edit(able)?|Factory|ment)|rtTlsRe(sponse|quest))|r(i(ng(Re(fAddr|ader)|Monitor(MBean)?|Bu(ilder|ffer(InputStream)?)|Selection|C(haracterIterator|ontent)|Tokenizer|IndexOutOfBoundsException|ValueExp|Writer)?|ctMath)|oke|uct|eam(Result|Source|Handler|CorruptedException|Tokenizer|PrintService(Factory)?)))|i(ngle(SelectionModel|PixelPackedSampleModel)|ze(Requirements|Sequence|2DSyntax|LimitExceededException)|des|gn(e(dObject|r)|ature(Spi|Exception)?)|mple(BeanInfo|T(ype|imeZone)|D(oc|ateFormat)|Formatter|AttributeSet))|SL(S(ocket(Factory)?|e(ssion(Binding(Event|Listener)|Context)?|rverSocket(Factory)?))|HandshakeException|Context(Spi)?|P(e(erUnverifiedException|rmission)|rotocolException)|E(ngine(Result)?|xception)|KeyException)|o(cket(SecurityException|Handler|Channel|TimeoutException|Impl(Factory)?|Options|Permission|Exception|Factory|Address)?|u(ndbank(Re(source|ader))?|rce(DataLine|Locator)?)|ft(Reference|BevelBorder)|rt(ResponseControl|ingFocusTraversalPolicy|Control|ed(Map|Set)|Key))|u(pp(ortedValuesAttribute|ressWarnings)|bject(D(omainCombiner|elegationPermission))?)|p(inner(Model|NumberModel|DateModel|UI|ListModel)|litPaneUI|ring(Layout)?)|e(c(ur(ity(Manager|Permission|Exception)?|e(Random(Spi)?|C(lassLoader|acheResponse)))|retKey(Spec|Factory(Spi)?)?)|t(OfIntegerSyntax)?|paratorUI|verity|quence(InputStream|r)?|lect(ionKey|or(Provider)?|ableChannel)|a(ledObject|rch(Result|Controls))|r(ial(Ref|Blob|izable(Permission)?|Struct|Clob|Datalink|JavaObject|Exception|Array)|v(ice(Registry|NotFoundException|U(navailableException|I(Factory)?)|Permission)|er(R(untimeException|ef)|Socket(Channel|Factory)?|NotActiveException|CloneException|E(rror|xception))))|gment|maphore)|keleton(MismatchException|NotFoundException)?|wing(Constants|Utilities|PropertyChangeSupport)|liderUI|a(sl(Server(Factory)?|Client(Factory)?|Exception)?|vepoint|mpleModel)|QL(Input(Impl)?|Output(Impl)?|Data|Permission|Exception|Warning)|AX(Result|Source|TransformerFactory|Parser(Factory)?))|H(yperlink(Event|Listener)|ttp(sURLConnection|RetryException|URLConnection)|i(erarchy(Bounds(Listener|Adapter)|Event|Listener)|ghlighter)|ostnameVerifier|TML(Document|EditorKit|FrameHyperlinkEvent|Writer)?|eadlessException|a(s(h(Map|table|Set|DocAttributeSet|Print(RequestAttributeSet|ServiceAttributeSet|JobAttributeSet)|AttributeSet)|Controls)|nd(shakeCompleted(Event|Listener)|ler)))|N(o(RouteToHostException|n(ReadableChannelException|invertibleTransformException|WritableChannelException)|t(BoundException|ification(Result|Broadcaster(Support)?|Emitter|Filter(Support)?|Listener)?|SerializableException|Yet(BoundException|ConnectedException)|Co(ntextException|mpliantMBeanException)|OwnerException|ActiveException)|Such(MethodE(rror|xception)|ObjectException|P(addingException|roviderException)|ElementException|FieldE(rror|xception)|A(ttributeException|lgorithmException))|deChange(Event|Listener)|C(onnectionPendingException|lassDefFoundError)|InitialContextException|PermissionException)|u(ll(Cipher|PointerException)|m(ericShaper|ber(Of(InterveningJobs|Documents)|Up(Supported)?|Format(ter|Exception)?)?))|e(t(Permission|workInterface)|gativeArraySizeException)|a(vigationFilter|m(ing(Manager|SecurityException|E(numeration|vent|xception(Event)?)|Listener)?|e(spaceC(hangeListener|ontext)|NotFoundException|C(lassPair|allback)|Parser|AlreadyBoundException)?)))|C(h(oice(Callback|Format)?|eck(sum|ed(InputStream|OutputStream)|box(Group|MenuItem)?)|a(n(nel(s)?|ge(dCharSetException|Event|Listener))|r(set(Decoder|Provider|Encoder)?|Buffer|Sequence|ConversionException|acter(CodingException|Iterator)?|Array(Reader|Writer)))|romaticity)|R(C32|L(Selector|Exception)?)|yclicBarrier|MMException|ipher(Spi|InputStream|OutputStream)?|SS|o(n(s(tructor|oleHandler)|nect(ion(P(oolDataSource|endingException)|Event(Listener)?)?|IOException|Exception)|current(M(odificationException|ap)|HashMap|LinkedQueue)|t(e(nt(Model|Handler(Factory)?)|xt(NotEmptyException|ualRenderedImageFactory)?)|ainer(OrderFocusTraversalPolicy|Event|Listener|Adapter)?|rol(lerEventListener|Factory)?)|dition|volveOp|fi(rmationCallback|guration(Exception)?))|okieHandler|d(ingErrorAction|e(S(igner|ource)|r(Result|MalfunctionError)))|unt(erMonitor(MBean)?|DownLatch)|p(yOnWriteArray(Set|List)|ies(Supported)?)|l(or(Model|S(upported|pace|electionModel)|C(hooser(ComponentFactory|UI)|onvertOp)|Type|UIResource)?|l(ection(s|CertStoreParameters)?|at(ion(ElementIterator|Key)|or)))|m(p(il(er|ationMXBean)|o(site(Name|Context|Type|Data(Support)?|View)?|nent(SampleModel|ColorModel|InputMap(UIResource)?|Orientation|UI|Event|View|Listener|Adapter)?|und(Border|Name|Control|Edit))|letionService|ara(tor|ble)|ression)|municationException|bo(Box(Model|UI|Editor)|Popup)))|u(stomizer|r(sor|rency)|bicCurve2D)|e(ll(RendererPane|Editor(Listener)?)|rt(ificate(NotYetValidException|ParsingException|E(ncodingException|x(ception|piredException))|Factory(Spi)?)?|S(tore(Spi|Parameters|Exception)?|elector)|Path(Builder(Result|Spi|Exception)?|TrustManagerParameters|Parameters|Validator(Result|Spi|Exception)?)?))|l(ip(board(Owner)?)?|o(se(d(ByInterruptException|SelectorException|ChannelException)|able)|ne(NotSupportedException|able)|b)|ass(NotFoundException|C(ircularityError|astException)|De(sc|finition)|F(ileTransformer|ormatError)|Load(ingMXBean|er(Repository)?))?)|a(n(not(RedoException|UndoException|ProceedException)|cel(l(edKeyException|ationException)|ablePrintJob)|vas)|che(Re(sponse|quest)|dRowSet)|l(endar|l(able(Statement)?|back(Handler)?))|r(dLayout|et(Event|Listener)?))|r(opImageFilter|edential(NotFoundException|Ex(ception|piredException))))|T(hr(owable|ead(Group|MXBean|Info|Death|PoolExecutor|Factory|Local)?)|ype(s|NotPresentException|InfoProvider|Variable)?|i(tledBorder|e|leObserver|me(stamp|outException|Zone|Unit|r(MBean|Notification|Task|AlarmClockNotification)?|LimitExceededException)?)|oo(ManyListenersException|l(BarUI|Tip(Manager|UI)|kit))|e(xt(Measurer|Syntax|HitInfo|Component|urePaint|InputCallback|OutputCallback|UI|Event|Field|L(istener|ayout)|A(ction|ttribute|rea))|mplates(Handler)?)|a(rget(edNotification|DataLine)?|gElement|b(S(top|et)|ular(Type|Data(Support)?)|Expander|le(Model(Event|Listener)?|HeaderUI|C(olumn(Model(Event|Listener)?)?|ell(Renderer|Editor))|UI|View)|ableView|bedPaneUI))|r(ust(Manager(Factory(Spi)?)?|Anchor)|ee(M(odel(Event|Listener)?|ap)|Se(t|lection(Model|Event|Listener))|Node|Cell(Renderer|Editor)|UI|Path|Expansion(Event|Listener)|WillExpandListener)|a(ns(parency|f(orm(er(Handler|ConfigurationException|Exception|Factory(ConfigurationError)?)?|Attribute)|er(Handler|able))|action(R(olledbackException|equiredException)|alWriter)|mitter)|ck)))|I(n(s(t(an(ce(NotFoundException|AlreadyExistsException)|tiationE(rror|xception))|rument(ation)?)|ufficientResourcesException|ets(UIResource)?)|herit(ed|ableThreadLocal)|comp(leteAnnotationException|atibleClassChangeError)|t(Buffer|e(r(na(tionalFormatter|l(Error|Frame(UI|Event|FocusTraversalPolicy|Listener|Adapter)))|rupt(ibleChannel|ed(NamingException|IOException|Exception)))|ger(Syntax)?)|rospect(ionException|or))|itial(Context(Factory(Builder)?)?|DirContext|LdapContext)|dex(ColorModel|edProperty(ChangeEvent|Descriptor)|OutOfBoundsException)|put(M(ismatchException|ethod(Requests|Highlight|Context|Descriptor|Event|Listener)?|ap(UIResource)?)|S(tream(Reader)?|ubset)|Context|Event|Verifier)|et(SocketAddress|4Address|Address|6Address)|v(ocation(Handler|TargetException|Event)|alid(R(ole(InfoException|ValueException)|elation(ServiceException|TypeException|IdException))|M(idiDataException|arkException)|Search(ControlsException|FilterException)|NameException|ClassException|T(argetObjectTypeException|ransactionException)|O(penTypeException|bjectException)|DnDOperationException|P(arameter(SpecException|Exception)|r(opertiesFormatException|eferencesFormatException))|Key(SpecException|Exception)|A(ctivityException|ttribute(sException|IdentifierException|ValueException)|pplicationException|lgorithmParameterException)))|flater(InputStream)?|lineView)|con(UIResource|View)?|te(ra(tor|ble)|m(Selectable|Event|Listener))|dentity(Scope|HashMap)?|CC_(ColorSpace|Profile(RGB|Gray)?)|IO(Re(ad(UpdateListener|ProgressListener|WarningListener)|gistry)|Metadata(Node|Controller|Format(Impl)?)?|ByteBuffer|ServiceProvider|I(nvalidTreeException|mage)|Param(Controller)?|Exception|Write(ProgressListener|WarningListener))|OException|vParameterSpec|llegal(MonitorStateException|Block(ingModeException|SizeException)|S(tateException|electorException)|C(harsetNameException|omponentStateException|lassFormatException)|ThreadStateException|PathStateException|Format(Co(nversionException|dePointException)|PrecisionException|Exception|FlagsException|WidthException)|A(ccessE(rror|xception)|rgumentException))|mag(ingOpException|e(Read(er(Spi|WriterSpi)?|Param)|GraphicAttribute|C(onsumer|apabilities)|T(ypeSpecifier|ranscoder(Spi)?)|I(nputStream(Spi|Impl)?|con|O)|O(utputStream(Spi|Impl)?|bserver)|Producer|View|Filter|Write(Param|r(Spi)?))?))|Z(ip(InputStream|OutputStream|E(ntry|xception)|File)|oneView)|O(ceanTheme|ut(put(Stream(Writer)?|DeviceAssigned|Keys)|OfMemoryError)|p(tion(PaneUI|alDataException)?|e(n(MBean(ConstructorInfo(Support)?|Info(Support)?|OperationInfo(Support)?|ParameterInfo(Support)?|AttributeInfo(Support)?)|Type|DataException)|rati(ngSystemMXBean|on(sException|NotSupportedException)?)))|ver(la(yLayout|ppingFileLockException)|ride)|wner|rientationRequested|b(serv(er|able)|j(ID|ect(Stream(C(onstants|lass)|Exception|Field)|Name|ChangeListener|In(stance|put(Stream|Validation)?)|Output(Stream)?|View|Factory(Builder)?)?))|AEPParameterSpec)|D(GC|ynamicMBean|nDConstants|i(splayMode|ctionary|alog|r(StateFactory|Context|ect(oryManager|ColorModel)|ObjectFactory)|gest(InputStream|OutputStream|Exception)|mension(2D|UIResource)?)|SA(P(ublicKey(Spec)?|aram(s|eterSpec)|rivateKey(Spec)?)|Key(PairGenerator)?)|H(GenParameterSpec|P(ublicKey(Spec)?|arameterSpec|rivateKey(Spec)?)|Key)|o(c(ument(Builder(Factory)?|Name|ed|Parser|Event|Filter|Listener)?|PrintJob|Flavor|Attribute(Set)?)?|uble(Buffer)?|mainCombiner)|u(plicateFormatFlagsException|ration)|TD(Constants)?|e(s(criptor(Support|Access)?|t(ination|roy(able|FailedException))|ignMode|ktop(Manager|IconUI|PaneUI))|cimalFormat(Symbols)?|precated|f(later(OutputStream)?|ault(M(utableTreeNode|e(nuLayout|talTheme))|B(oundedRangeModel|uttonModel)|S(tyledDocument|ingleSelectionModel)|Highlighter|C(o(lorSelectionModel|mboBoxModel)|ellEditor|aret)|T(extUI|able(Model|C(olumnModel|ellRenderer))|ree(Model|SelectionModel|Cell(Renderer|Editor)))|DesktopManager|PersistenceDelegate|EditorKit|KeyboardFocusManager|Fo(cus(Manager|TraversalPolicy)|rmatter(Factory)?)|L(ist(Model|SelectionModel|CellRenderer)|oaderRepository)))|l(egationPermission|ay(ed|Queue))|bugGraphics)|OM(Result|Source|Locator)|ES(edeKeySpec|KeySpec)|at(e(Time(Syntax|At(C(ompleted|reation)|Processing))|Format(ter|Symbols)?)?|a(Buffer(Byte|Short|Int|Double|UShort|Float)?|type(Con(stants|figurationException)|Factory)|Source|Truncation|Input(Stream)?|Output(Stream)?|gram(Socket(Impl(Factory)?)?|Channel|Packet)|F(ormatException|lavor)|baseMetaData|Line))|r(iver(Manager|PropertyInfo)?|opTarget(Context|Dr(opEvent|agEvent)|Event|Listener|Adapter)?|ag(Gesture(Recognizer|Event|Listener)|Source(MotionListener|Context|Dr(opEvent|agEvent)|Event|Listener|Adapter)?)))|U(R(I(Resolver|Syntax(Exception)?|Exception)?|L(StreamHandler(Factory)?|C(onnection|lassLoader)|Decoder|Encoder)?)|n(s(olicitedNotification(Event|Listener)?|upported(C(harsetException|lassVersionError|allbackException)|OperationException|EncodingException|FlavorException|LookAndFeelException|A(ddressTypeException|udioFileException))|atisfiedLinkError)|icastRemoteObject|d(o(Manager|ableEdit(Support|Event|Listener)?)|eclaredThrowableException)|expectedException|known(GroupException|ServiceException|HostException|ObjectException|Error|Format(ConversionException|FlagsException))|re(solved(Permission|AddressException)|coverable(EntryException|KeyException)|ferenced)|m(odifiable(SetException|ClassException)|a(ppableCharacterException|rshalException)))|til(ities|Delegate)?|TFDataFormatException|I(Resource|Manager|D(efaults)?)|UID)|J(R(ootPane|adioButton(MenuItem)?)|M(RuntimeException|X(Serv(iceURL|erErrorException)|Connect(ionNotification|or(Server(MBean|Provider|Factory)?|Provider|Factory)?)|Pr(incipal|oviderException)|Authenticator)|enu(Bar|Item)?|Exception)|Button|S(croll(Bar|Pane)|p(inner|litPane)|eparator|lider)|o(in(RowSet|able)|b(Me(ssageFromOperator|diaSheets(Supported|Completed)?)|S(heets|tate(Reason(s)?)?)|HoldUntil|Name|Impressions(Supported|Completed)?|OriginatingUserName|Priority(Supported)?|KOctets(Supported|Processed)?|Attributes))|dbcRowSet|C(heckBox(MenuItem)?|o(lorChooser|m(ponent|boBox)))|T(o(ol(Bar|Tip)|ggleButton)|ext(Component|Pane|Field|Area)|ab(le(Header)?|bedPane)|ree)|InternalFrame|OptionPane|D(ialog|esktopPane)|P(opupMenu|EG(HuffmanTable|Image(ReadParam|WriteParam)|QTable)|a(sswordField|nel)|rogressBar)|EditorPane|ar(InputStream|OutputStream|URLConnection|E(ntry|xception)|File)|Viewport|F(ileChooser|ormattedTextField|rame)|Window|L(ist|a(yeredPane|bel))|Applet)|P(hantomReference|BE(ParameterSpec|Key(Spec)?)|i(pe(d(Reader|InputStream|OutputStream|Writer))?|xel(Grabber|InterleavedSampleModel))|S(SParameterSpec|ource)|o(sition|int(2D|erInfo)?|oledConnection|pup(Menu(UI|Event|Listener)?|Factory)?|l(ygon|icy(Node|QualifierInfo)?)|rt(UnreachableException|ableRemoteObject(Delegate)?)?)|u(shback(Reader|InputStream)|blicKey)|er(sisten(ceDelegate|tMBean)|mission(s|Collection)?)|DLOverrideSupported|lain(Document|View)|a(ssword(Callback|View|Authentication)|nel(UI)?|ck(200|edColorModel|age)|t(hIterator|ch|tern(SyntaxException)?)|int(Context|Event)?|per|r(se(Position|Exception|r(ConfigurationException|Delegator)?)|tialResultException|a(graphView|meter(MetaData|Block|izedType|Descriptor)))|ge(sPerMinute(Color)?|Ranges|dResults(ResponseControl|Control)|able|Format|Attributes))|K(CS8EncodedKeySpec|IX(BuilderParameters|CertPath(BuilderResult|Checker|ValidatorResult)|Parameters))|r(i(n(cipal|t(RequestAttribute(Set)?|Graphics|S(tream|ervice(Lookup|Attribute(Set|Event|Listener)?)?)|er(Resolution|Graphics|M(oreInfo(Manufacturer)?|essageFromOperator|akeAndModel)|State(Reason(s)?)?|Name|I(sAcceptingJobs|nfo|OException)|URI|Job|Exception|Location|AbortException)|Job(Event|Listener|A(ttribute(Set|Event|Listener)?|dapter))?|E(vent|xception)|able|Quality|Writer))|ority(BlockingQueue|Queue)|v(ileged(ExceptionAction|Action(Exception)?)|ate(MLet|C(lassLoader|redentialPermission)|Key)))|o(cess(Builder)?|t(ocolException|ectionDomain)|pert(y(ResourceBundle|Change(Support|Event|Listener(Proxy)?)|Descriptor|Permission|Editor(Manager|Support)?|VetoException)|ies)|vider(Exception)?|fileDataException|gress(Monitor(InputStream)?|BarUI)|xy(Selector)?)|e(sentationDirection|dicate|paredStatement|ference(s(Factory)?|Change(Event|Listener)))))|E(n(c(ode(dKeySpec|r)|ryptedPrivateKeyInfo)|tity|um(Map|S(yntax|et)|Con(stantNotPresentException|trol)|eration)?)|tchedBorder|ditorKit|C(GenParameterSpec|P(oint|ublicKey(Spec)?|arameterSpec|rivateKey(Spec)?)|Key|Field(F(2m|p))?)|OFException|vent(SetDescriptor|Handler|Context|Object|DirContext|Queue|Listener(Proxy|List)?)?|l(ement(Type|Iterator)?|lip(se2D|ticCurve))|rror(Manager|Listener)?|x(c(hanger|eption(InInitializerError|Listener)?)|te(ndedRe(sponse|quest)|rnalizable)|p(ortException|andVetoException|ression)|e(cut(ionException|or(s|Service|CompletionService)?)|mptionMechanism(Spi|Exception)?))|mpty(Border|StackException))|V(MID|i(sibility|ew(port(UI|Layout)|Factory)?|rtualMachineError)|o(i(ceStatus|d)|latileImage)|e(ctor|toableChange(Support|Listener(Proxy)?)|rifyError)|a(l(idator(Handler)?|ue(Handler(MultiFormat)?|Exp))|riableHeightLayoutCache))|Ke(y(Rep|Generator(Spi)?|Manage(r(Factory(Spi)?)?|mentException)|S(t(ore(BuilderParameters|Spi|Exception)?|roke)|pec)|Pair(Generator(Spi)?)?|E(vent(Dispatcher|PostProcessor)?|xception)|Factory(Spi)?|map|boardFocusManager|Listener|A(dapter|lreadyExistsException|greement(Spi)?))?|r(nel|beros(Ticket|Principal|Key)))|Q(Name|u(e(ue(dJobCount)?|ry(E(val|xp))?)|adCurve2D))|F(i(nishings|delity|eld(Position|View)?|l(ter(Reader|InputStream|ed(RowSet|ImageSource)|OutputStream|Writer)?|e(Reader|nameFilter|SystemView|Handler|N(otFoundException|ameMap)|C(h(ooserUI|annel)|acheImage(InputStream|OutputStream))|I(nputStream|mage(InputStream|OutputStream))|OutputStream|D(ialog|escriptor)|Permission|View|Filter|Writer|Lock(InterruptionException)?)?)|xedHeightLayoutCache)|o(nt(RenderContext|Metrics|UIResource|FormatException)?|cus(Manager|TraversalPolicy|Event|Listener|Adapter)|rm(SubmitEvent|at(t(er(ClosedException)?|able(Flags)?)|ConversionProvider|FlagsConversionMismatchException)?|View))|uture(Task)?|eatureDescriptor|l(o(w(View|Layout)|at(Buffer|Control)?)|ushable|a(tteningPathIterator|vor(Map|Table|E(vent|xception)|Listener)))|a(ctoryConfigurationError|iledLoginException)|rame)|W(i(ndow(StateListener|Constants|Event|FocusListener|Listener|Adapter)?|ldcardType)|e(ak(Reference|HashMap)|bRowSet)|r(it(e(r|AbortedException)|able(R(enderedImage|aster)|ByteChannel))|appedPlainView))|L(i(st(ResourceBundle|Model|Selection(Model|Event|Listener)|CellRenderer|Iterator|enerNotFoundException|Data(Event|Listener)|UI|View)?|n(e(Metrics|B(order|reakMeasurer)|2D|Number(Reader|InputStream)|UnavailableException|Event|Listener)?|k(Ref|ed(BlockingQueue|Hash(Map|Set)|List)|Exception|ageError|LoopException))|mitExceededException)|o(ng(Buffer)?|c(k(Support)?|a(teRegistry|le))|ok(up(Table|Op)|AndFeel)|aderHandler|g(Record|Manager|in(Module|Context|Exception)|Stream|g(ing(MXBean|Permission)|er)))|dap(ReferralException|Name|Context)|e(vel|ase)|DAPCertStoreParameters|a(stOwnerException|y(out(Manager(2)?|Queue|FocusTraversalPolicy)|eredHighlighter)|nguageCallback|bel(UI|View)?))|A(s(sertionError|ync(hronousCloseException|BoxView))|n(notat(ion(TypeMismatchException|FormatError)?|edElement)|cestor(Event|Listener))|c(c(ount(NotFoundException|Ex(ception|piredException)|LockedException)|ess(ible(R(ole|e(sourceBundle|lation(Set)?))|Bundle|S(t(ate(Set)?|reamable)|election)|Hyper(text|link)|Co(ntext|mponent)|T(ext(Sequence)?|able(ModelChange)?)|Icon|Object|E(ditableText|xtended(Component|T(ext|able)))|Value|KeyBinding|A(ction|ttributeSequence))?|Control(Context|Exception|ler)|Exception))|ti(on(Map(UIResource)?|Event|Listener)?|v(ity(RequiredException|CompletedException)|eEvent|at(ion(Group(_Stub|ID|Desc)?|Monitor|System|I(nstantiator|D)|Desc|Exception)|or|eFailedException|able)))|l(NotFoundException|Entry)?)|t(tribute(s|ModificationException|Set(Utilities)?|d(String|CharacterIterator)|NotFoundException|ChangeNotification(Filter)?|InUseException|Exception|ValueExp|List)?|omic(Reference(FieldUpdater|Array)?|MarkableReference|Boolean|StampedReference|Integer(FieldUpdater|Array)?|Long(FieldUpdater|Array)?))|d(just(able|ment(Event|Listener))|ler32)|u(t(h(orizeCallback|enticat(ion(NotSupportedException|Exception)|or)|P(ermission|rovider))|oscroll)|dio(System|Clip|InputStream|Permission|F(ile(Reader|Format|Writer)|ormat)))|pp(ConfigurationEntry|endable|let(Stub|Context|Initializer)?)|ffineTransform(Op)?|l(phaComposite|lPermission|ready(BoundException|ConnectedException)|gorithmParameter(s(Spi)?|Generator(Spi)?|Spec))|r(c2D|ithmeticException|ea(AveragingScaleFilter)?|ray(s|BlockingQueue|StoreException|Type|IndexOutOfBoundsException|List)?)|bstract(M(ethodError|ap)|B(order|utton)|S(pinnerModel|e(t|quentialList|lect(ionKey|or|ableChannel)))|C(ol(orChooserPanel|lection)|ellEditor)|TableModel|InterruptibleChannel|Document|UndoableEdit|Preferences|ExecutorService|Queue(dSynchronizer)?|Writer|L(ist(Model)?|ayoutCache)|Action)|WT(Permission|E(vent(Multicaster|Listener(Proxy)?)?|rror|xception)|KeyStroke)))\\b"
  },
  "strings": {
    "patterns": [
      {
        "name": "string.quoted.double.java",
        "begin": "\"",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.java"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.java"
          }
        },
        "end": "\"",
        "patterns": [
          {
            "name": "constant.character.escape.java",
            "match": "\\\\."
          }
        ]
      },
      {
        "name": "string.quoted.single.java",
        "begin": "'",
        "endCaptures": {
          "0": {
            "name": "punctuation.definition.string.end.java"
          }
        },
        "beginCaptures": {
          "0": {
            "name": "punctuation.definition.string.begin.java"
          }
        },
        "end": "'",
        "patterns": [
          {
            "name": "constant.character.escape.java",
            "match": "\\\\."
          }
        ]
      }
    ]
  },
  "storage-type-java": {
    "name": "storage.type.java",
    "match": "\\b(void|byte|short|char|int|long|float|double|boolean|([a-z]\\w+\\.)*[A-Z]\\w+)\\b"
  },
  "support-type-java": {
    "name": "support.type.java",
    "match": "\\b(java(x)?\\.([a-z]\\w+\\.)+[A-Z]\\w+)\\b"
  },
  "statement-remainder": {
    "patterns": [
      {
        "name": "meta.definition.param-list.java",
        "begin": "\\(",
        "end": "(?=\\))",
        "patterns": [
          {
            "include": "#all-types"
          }
        ]
      },
      {
        "name": "meta.definition.throws.java",
        "begin": "(throws)",
        "captures": {
          "1": {
            "name": "keyword.other.class-fns.java"
          }
        },
        "end": "(?={)",
        "patterns": [
          {
            "include": "#all-types"
          }
        ]
      }
    ]
  }
};

var patterns = [
  {
    "name": "comment.block.empty.java",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.java"
      }
    },
    "match": "/\\*\\*/"
  },
  {
    "name": "comment.block.documentation.java",
    "begin": "(^\\s*)?/\\*\\*",
    "captures": {
      "0": {
        "name": "punctuation.definition.comment.java"
      }
    },
    "end": "\\*/(\\s*\\n)?",
    "patterns": [
      {
        "name": "keyword.other.documentation.javadoc.java",
        "match": "@(param|return|throws|exception|author|version|see|since|serial|serialField|serialData|deprecated)\\b"
      },
      {
        "name": "keyword.other.documentation.javadoc.link.java",
        "match": "\\{@link\\s+[^\\}]*\\}"
      }
    ]
  },
  {
    "name": "meta.definition.class.java",
    "begin": "(?x)^\\s*\n\t\t\t\t\t((?:\\b(public|private|protected|static|final|native|synchronized|abstract|threadsafe|transient)\\b\\s*)*) # modifier\n\t\t\t\t\t(class|interface)\\s+\n\t\t\t\t\t(\\w+)\\s* # identifier",
    "captures": {
      "1": {
        "name": "storage.modifier.java"
      },
      "3": {
        "name": "storage.type.java"
      },
      "4": {
        "name": "entity.name.type.class.java"
      }
    },
    "end": "(?={)",
    "patterns": [
      {
        "name": "meta.definition.class.extends.java",
        "begin": "\\b(extends)\\b\\s+",
        "captures": {
          "1": {
            "name": "storage.modifier.java"
          }
        },
        "end": "(?={|implements)",
        "patterns": [
          {
            "include": "#all-types"
          }
        ]
      },
      {
        "name": "meta.definition.class.implements.java",
        "begin": "\\b(implements)\\b\\s+",
        "captures": {
          "1": {
            "name": "storage.modifier.java"
          }
        },
        "end": "(?={|extends)",
        "patterns": [
          {
            "include": "#all-types"
          }
        ]
      }
    ]
  },
  {
    "name": "meta.definition.constructor.java",
    "begin": "(?x)^\\s*\n\t\t\t\t\t((?:\\b(public|private|protected|static|final|native|synchronized|abstract|threadsafe|transient)\\b\\s*)*) # modifier\n\t\t\t\t\t((?!(if|while|for|catch|this|print|return|synchronized|switch))\\w+)\\s* # identifier\n\t\t\t\t\t(?!.*;)  # abort if line has a ;\n\t\t\t\t\t(?=\\()",
    "captures": {
      "1": {
        "name": "storage.modifier.java"
      },
      "3": {
        "name": "entity.name.function.constructor.java"
      }
    },
    "end": "(?={)",
    "patterns": [
      {
        "include": "#statement-remainder"
      },
      {
        "include": "#comments"
      }
    ]
  },
  {
    "name": "meta.definition.method.java",
    "begin": "(?x)^\\s*\n\t\t\t\t\t((?:\\b(public|private|protected|static|final|native|synchronized|abstract|threadsafe|transient)\\b\\s*)*) # modifier\n\t\t\t\t\t(\\b(void|boolean|byte|char|short|int|float|long|double|(\\w+\\.)*[A-Z]\\w+)\\b(<((?:\\w+\\.)*[A-Z]\\w+)>|\\[\\s*\\])?)\\s* # type\n\t\t\t\t\t(\\w+)\\s* # identifier\n\t\t\t\t\t(?!.*;)  # abort if line has a ;\n\t\t\t\t\t(?=\\()",
    "beginCaptures": {
      "6": {
        "name": "storage.type.java"
      },
      "8": {
        "name": "entity.name.function.java"
      },
      "1": {
        "name": "storage.modifier.java"
      },
      "4": {
        "name": "storage.type.java"
      }
    },
    "end": "(?={)",
    "patterns": [
      {
        "include": "#statement-remainder"
      },
      {
        "include": "#comments"
      }
    ]
  },
  {
    "name": "constant.other.java",
    "match": "\\b([A-Z][A-Z0-9_]+)\\b"
  },
  {
    "include": "#comments"
  },
  {
    "include": "#all-types"
  },
  {
    "name": "storage.modifier.access-control.java",
    "match": "\\b(private|protected|public)\\b"
  },
  {
    "name": "storage.modifier.java",
    "match": "\\b(abstract|final|native|static|transient|synchronized|volatile|strictfp|extends|implements)\\b"
  },
  {
    "name": "storage.type.java",
    "match": "\\b(class|interface)\\b"
  },
  {
    "name": "keyword.control.catch-exception.java",
    "match": "\\b(try|catch|finally|throw)\\b"
  },
  {
    "name": "keyword.control.java",
    "match": "\\b(return|break|case|continue|default|do|while|for|switch|if|else)\\b"
  },
  {
    "name": "meta.import.java",
    "captures": {
      "1": {
        "name": "keyword.other.class-fns.java"
      },
      "2": {
        "name": "entity.name.type.import.java"
      }
    },
    "match": "^\\s*(import)\\s+([^ ;]+?);"
  },
  {
    "name": "meta.package.java",
    "captures": {
      "1": {
        "name": "keyword.other.class-fns.java"
      },
      "2": {
        "name": "entity.name.function.package.java"
      }
    },
    "match": "^\\s*(package)\\s+([^ ;]+?);"
  },
  {
    "name": "keyword.other.class-fns.java",
    "match": "\\b(new|throws)\\b"
  },
  {
    "name": "keyword.operator.java",
    "match": "\\b(instanceof)\\b"
  },
  {
    "name": "constant.language.java",
    "match": "\\b(true|false|null)\\b"
  },
  {
    "name": "variable.language.java",
    "match": "\\b(this|super)\\b"
  },
  {
    "name": "constant.numeric.java",
    "match": "\\b((0(x|X)[0-9a-fA-F]*)|(([0-9]+\\.?[0-9]*)|(\\.[0-9]+))((e|E)(\\+|-)?[0-9]+)?)([LlFfUuDd]|UL|ul)?\\b"
  },
  {
    "include": "#strings"
  },
  {
    "name": "keyword.operator.comparison.java",
    "match": "(==|!=|<=|>=|<>|<|>)"
  },
  {
    "name": "keyword.operator.increment-decrement.java",
    "match": "(\\-\\-|\\+\\+)"
  },
  {
    "name": "keyword.operator.arithmetic.java",
    "match": "(\\-|\\+|\\*|\\/|%)"
  },
  {
    "name": "keyword.operator.logical.java",
    "match": "(!|&&|\\|\\|)"
  }
];

exports.JavaSyntax = new TextmateSyntax(repositories, patterns);
