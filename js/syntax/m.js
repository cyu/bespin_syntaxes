"define metadata";
({
    "description": "MATLAB syntax highlighter",
    "dependencies": { "textmate_syntax": "0.0.0" },
    "environments": { "worker": true },
    "provides": [
        {
            "ep": "syntax",
            "name": "MATLAB",
            "pointer": "#MATLABSyntax",
            "fileexts": null
        }
    ]
});
"end";

var Promise = require('bespin:promise').Promise;
var TextmateSyntax = require('textmate_syntax').TextmateSyntax;

var repositories = null;

var patterns = [
  {
    "name": "storage.modifier.matlab",
    "match": "\\b(varargin|varargout)\\b"
  },
  {
    "name": "keyword.control.matlab",
    "match": "\\b(case|otherwise)\\b"
  },
  {
    "name": "keyword.other.matlab",
    "match": "\\b(inputname|get|findobj|allchild|dbstack|stop|waitbar)\\b"
  },
  {
    "name": "meta.scope.expression.matlab",
    "begin": "\\({2}",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.matlab"
      }
    },
    "end": "\\){2}",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.scope.logical-expression.matlab",
    "begin": "\\[{2}",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.matlab"
      }
    },
    "end": "\\]{2}",
    "patterns": [
      {
        "name": "keyword.operator.logical.matlab",
        "comment": "do we want a special rule for ( expr )?",
        "match": "==|~=|&|~|\\|"
      },
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "meta.scope.parens.matlab",
    "begin": "\\(",
    "captures": {
      "0": {
        "name": "punctuation.section.scope.matlab"
      }
    },
    "end": "\\)",
    "patterns": [
      {
        "include": "$self"
      }
    ]
  },
  {
    "name": "comment.line.percentage.matlab",
    "captures": {
      "1": {
        "name": "punctuation.definition.comment.matlab"
      }
    },
    "match": "(%).*$\\n?"
  },
  {
    "name": "variable.other.transpose.matlab",
    "match": "[a-zA-Z)\\]]'"
  },
  {
    "name": "string.quoted.single.matlab",
    "begin": "'",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.matlab"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.matlab"
      }
    },
    "end": "(')|\\n",
    "patterns": [
      {
        "name": "constant.character.escape.matlab",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "string.quoted.double.matlab",
    "begin": "\"",
    "endCaptures": {
      "0": {
        "name": "punctuation.definition.string.end.matlab"
      }
    },
    "beginCaptures": {
      "0": {
        "name": "punctuation.definition.string.begin.matlab"
      }
    },
    "end": "\"",
    "patterns": [
      {
        "name": "constant.character.escape.matlab",
        "match": "\\\\."
      }
    ]
  },
  {
    "name": "keyword.other.matlab",
    "match": "\\b(all_va_args|clf|endfor|if|break|endfunction|persistent|catch|endif|return|continue|endwhile|try|else|for|unwind_protect|elseif|function|unwind_protect_cleanup|end|global|while|end_try_catch|gplot|end_unwind_protect|gsplot)\\b"
  },
  {
    "name": "constant.language.boolean.matlab",
    "match": "\\b(true|false)\\b"
  },
  {
    "name": "constant.language.matlab",
    "match": "\\b(NaN|nan|inf|pi|Inf|realmax|realmin|eps)\\b"
  },
  {
    "name": "support.constant.matlab",
    "match": "\\b(F_DUPFD|O_EXCL|filesep|F_GETFD|O_NONBLOCK|i|F_GETFL|O_RDONLY|F_SETFD|O_RDWR|j|F_SETFL|O_TRUNC|I|O_WRONLY|P_tmpdir|program_invocation_name|J|SEEK_CUR|program_name|NA|SEEK_END|SEEK_SET|OCTAVE_HOME|SIG|stderr|OCTAVE_VERSION|argv|stdin|O_APPEND|e|stdout|O_ASYNC|O_CREAT)\\b"
  },
  {
    "name": "support.variable.matlab",
    "match": "\\b(DEFAULT_EXEC_PATH|ignore_function_time_stamp|DEFAULT_LOADPATH|max_recursion_depth|EDITOR|output_max_field_width|EXEC_PATH|output_precision|IMAGEPATH|page_output_immediately|INFO_FILE|page_screen_output|INFO_PROGRAM|print_answer_id_name|LOADPATH|print_empty_dimensions|MAKEINFO_PROGRAM|print_rhs_assign_val|PAGER|save_header_format_string|PS1|save_precision|PS2|saving_history|PS4|sighup_dumps_octave_core|__kluge_procbuf_delay__|sigterm_dumps_octave_core|__nargin__|silent_functions|ans|split_long_rows|automatic_replot|string_fill_char|beep_on_error|struct_levels_to_print|completion_append_char|suppress_verbose_help_message|crash_dumps_octave_core|variables_can_hide_functions|current_script_file_name|warn_assign_as_truth_value|debug_on_error|warn_divide_by_zero|debug_on_interrupt|warn_empty_list_elements|debug_on_warning|warn_fortran_indexing|debug_symtab_lookups|warn_function_name_clash|default_save_format|warn_future_time_stamp|echo_executing_commands|warn_imag_to_real|fixed_point_format|warn_matlab_incompatible|gnuplot_binary|warn_missing_semicolon|gnuplot_command_axes|warn_neg_dim_as_zero|gnuplot_command_end|warn_num_to_str|gnuplot_command_plot|warn_precedence_change|gnuplot_command_replot|warn_reload_forces_clear|gnuplot_command_splot|warn_resize_on_range_error|gnuplot_command_title|warn_separator_insert|gnuplot_command_using|warn_single_quote_string|gnuplot_command_with|warn_str_to_num|gnuplot_has_frames|warn_undefined_return_values|history_file|warn_variable_switch_label|history_size)\\b"
  },
  {
    "name": "keyword.other.commands.matlab",
    "match": "\\b(__end__|diary|isvarname|set|casesen|echo|load|show|cd|edit_history|ls|type|chdir|format|mark_as_command|unmark_command|clear|gset|mislocked|which|dbclear|gshow|mlock|who|dbstatus|help|more|whos|dbstop|history|munlock|dbtype|hold|run_history|dbwhere|iskeyword|save)\\b"
  },
  {
    "name": "support.function.mapper.matlab",
    "match": "\\b(abs|cos|is_nan_or_na|isnan|sign|acos|cosh|isalnum|isprint|sin|acosh|erf|isalpha|ispunct|sinh|angle|erfc|isascii|isspace|sqrt|arg|exp|iscntrl|isupper|tan|asin|finite|isdigit|isxdigit|tanh|asinh|fix|isfinite|lgamma|toascii|atan|floor|isgraph|log|tolower|atanh|gamma|isinf|log10|toupper|ceil|gammaln|islower|real|conj|imag|isna|round)\\b"
  },
  {
    "name": "support.function.general.matlab",
    "match": "\\b(ERRNO|iscellstr|__end__|ischar|__error_text__|iscntrl|__print_symbol_info__|iscomplex|__print_symtab_info__|isdigit|abs|isempty|acos|isfield|acosh|isfinite|airy|isglobal|all|isgraph|angle|ishold|any|isieee|append|isinf|arg|iskeyword|asin|islist|asinh|islogical|assignin|islower|atan|ismatrix|atan2|isna|atanh|isnan|atexit|isnumeric|balance|isprint|besselh|ispunct|besseli|isreal|besselj|isspace|besselk|isstream|bessely|isstreamoff|betainc|isstruct|casesen|isupper|cd|isvarname|ceil|isxdigit|cell|kbhit|cellstr|keyboard|char|kill|chdir|kron|chol|lasterr|class|lastwarn|clc|length|clear|lgamma|clearplot|link|clg|linspace|closeplot|list|colloc|load|completion_matches|localtime|conj|log|cos|log10|cosh|lpsolve|cumprod|lpsolve_options|cumsum|ls|daspk|lsode|daspk_options|lsode_options|dasrt|lstat|dasrt_options|lu|dassl|mark_as_command|dassl_options|max|dbclear|min|dbstatus|mislocked|dbstop|mkdir|dbtype|mkfifo|dbwhere|mkstemp|det|mktime|diag|mlock|diary|more|disp|munlock|do_string_escapes|nargin|document|nargout|dup2|native_float_format|echo|ndims|edit_history|nth|eig|numel|endgrent|octave_config_info|endpwent|octave_tmp_file_name|erf|odessa|erfc|odessa_options|error|ones|error_text|pause|eval|pclose|evalin|permute|exec|pinv|exist|pipe|exit|popen|exp|printf|expm|prod|eye|purge_tmp_files|fclose|putenv|fcntl|puts|fdisp|pwd|feof|qr|ferror|quad|feval|quad_options|fflush|quit|fft|qz|fft2|rand|fgetl|randn|fgets|read_readline_init_file|fieldnames|readdir|file_in_loadpath|readlink|file_in_path|real|filter|rehash|find|rename|find_first_of_in_loadpath|reshape|finite|reverse|fix|rmdir|floor|round|fmod|run_history|fnmatch|save|fopen|scanf|fork|schur|format|set|fprintf|setgrent|fputs|setpwent|fread|shell_cmd|freport|show|frewind|sign|fscanf|sin|fseek|sinh|fsolve|size|fsolve_options|sleep|ftell|sort|func2str|source|functions|splice|fwrite|sprintf|gamma|sqrt|gammainc|sqrtm|gammaln|squeeze|getegid|sscanf|getenv|stat|geteuid|str2func|getgid|streamoff|getgrent|strftime|getgrgid|strptime|getgrnam|sum|getpgrp|sumsq|getpid|svd|getppid|syl|getpwent|symlink|getpwnam|system|getpwuid|tan|getrusage|tanh|getuid|tilde_expand|givens|time|glob|tmpfile|gmtime|tmpnam|graw|toascii|gset|tolower|gshow|toupper|help|type|hess|typeinfo|history|umask|hold|undo_string_escapes|home|unlink|ifft|unmark_command|ifft2|usage|imag|usleep|input|va_arg|input_event_hook|va_start|inv|vr_val|inverse|waitpid|ipermute|warning|is_nan_or_na|warranty|isalnum|which|isalpha|who|isascii|whos|isbool|zeros|iscell)\\b"
  },
  {
    "name": "support.function.audio.matlab",
    "match": "\\b(lin2mu|mu2lin|record|setaudio|loadaudio|playaudio|saveaudio)\\b"
  },
  {
    "name": "support.function.control.base.matlab",
    "match": "\\b(DEMOcontrol|bode_bounds|dlqe|lqe|obsv|__bodquist__|controldemo|dlqr|lqg|place|__freqresp__|ctrb|dlyap|lqr|pzmap|__stepimp__|damp|dre|lsim|rldemo|analdemo|dare|frdemo|ltifr|rlocus|are|dcgain|freqchkw|lyap|step|bddemo|dgram|gram|nichols|tzero|bode|dkalman|impulse|nyquist|tzero2)\\b"
  },
  {
    "name": "support.function.control.hinf.matlab",
    "match": "\\b(dgkfdemo|h2syn|hinfnorm|hinfsyn_ric|dhinfdemo|hinf_ctr|hinfsyn|is_dgkf|h2norm|hinfdemo|hinfsyn_chk|wgt1o)\\b"
  },
  {
    "name": "invalid.deprecated.obsolete.function.control.matlab",
    "match": "\\b(dezero|packsys|series|syschnames|dlqg|qzval|swapcols|unpacksys|minfo|rotg|swaprows)\\b"
  },
  {
    "name": "support.function.control.system.matlab",
    "match": "\\b(__abcddims__|is_observable|sys2tf|sysprune|__syschnamesl__|is_sample|sys2zp|sysreorder|__syscont_disc__|is_signal_list|sysadd|sysrepdemo|__sysdefioname__|is_siso|sysappend|sysscale|__sysdefstname__|is_stabilizable|syschtsam|syssetsignals|__sysgroupn__|is_stable|sysconnect|syssub|__tf2sysl__|jet707|syscont|sysupdate|__zp2ssg2__|listidx|sysdimensions|tf2ss|abcddim|moddemo|sysdisc|tf2sys|buildssic|ord2|sysdup|tf2zp|c2d|packedform|sysgetsignals|tfout|d2c|parallel|sysgettsam|ugain|dmr2d|ss2sys|sysgettype|zp2ss|fir2sys|ss2tf|sysgroup|zp2sys|is_abcd|ss2zp|sysidx|zp2tf|is_controllable|starp|sysmin|zpout|is_detectable|sys2fir|sysmult|is_digital|sys2ss|sysout)\\b"
  },
  {
    "name": "support.function.control.util.matlab",
    "match": "\\b(__outlist__|run_cmd|zgfmul|zgrownorm|__zgpbal__|sortcom|zgfslv|zgscal|axis2dlim|strappend|zginit|zgsgiv|prompt|swap|zgreduce|zgshsr)\\b"
  },
  {
    "name": "invalid.deprecated.function.matlab",
    "match": "\\b(is_bool|is_matrix|is_struct|setstr|is_complex|is_scalar|is_symmetric|struct_contains|is_global|is_square|is_vector|struct_elements|is_list|is_stream|isstr)\\b"
  },
  {
    "name": "support.function.elfun.matlab",
    "match": "\\b(acot|acsc|asec|cot|csc|gcd|sec|acoth|acsch|asech|coth|csch|lcm|sech)\\b"
  },
  {
    "name": "support.function.finance.matlab",
    "match": "\\b(fv|fvl|irr|nper|npv|pmt|pv|pvl|rate|vol)\\b"
  },
  {
    "name": "support.function.general.matlab",
    "match": "\\b(cart2pol|issquare|prepad|cart2sph|issymmetric|randperm|columns|isvector|rem|common_size|logical|repmat|diff|logspace|rot90|fliplr|mod|rows|flipud|nargchk|shift|ind2sub|nextpow2|sph2cart|int2str|num2str|strerror|is_duplicate_entry|perror|sub2ind|isdefinite|pol2cart|tril|isscalar|postpad|triu)\\b"
  },
  {
    "name": "support.function.image.matlab",
    "match": "\\b(colormap|hsv2rgb|imshow|loadimage|rgb2hsv|saveimage|gray|image|ind2gray|ntsc2rgb|rgb2ind|gray2ind|imagesc|ind2rgb|ocean|rgb2ntsc)\\b"
  },
  {
    "name": "support.function.io.matlab",
    "match": "\\b(beep)\\b"
  },
  {
    "name": "support.function.linear-algebra.matlab",
    "match": "\\b(commutation_matrix|housh|orth|cond|krylov|qzhess|cross|krylovb|rank|dmult|logm|trace|dot|norm|vec|duplication_matrix|null|vech)\\b"
  },
  {
    "name": "support.function.misc.matlab",
    "match": "\\b(bincoeff|dump_prefs|ispc|path|toc|bug_report|etime|isunix|popen2|unix|comma|fileparts|list_primes|semicolon|version|computer|flops|menu|tempdir|vertcat|cputime|fullfile|not|tempname|xor|delete|horzcat|pack|texas_lotto|dir|is_leap_year|paren|tic)\\b"
  },
  {
    "name": "support.function.plot.matlab",
    "match": "\\b(__axis_label__|__plt__|loglogerr|semilogyerr|__errcomm__|__pltopt1__|mesh|shg|__errplot__|__pltopt__|meshdom|sombrero|__plr1__|axis|meshgrid|stairs|__plr2__|bar|mplot|subplot|__plr__|bottom_title|multiplot|subwindow|__plt1__|close|oneplot|title|__plt2__|contour|plot|top_title|__plt2mm__|errorbar|plot_border|xlabel|__plt2mv__|figure|polar|ylabel|__plt2ss__|grid|semilogx|zlabel|__plt2vm__|hist|semilogxerr|__plt2vv__|loglog|semilogy)\\b"
  },
  {
    "name": "support.function.polynomial.matlab",
    "match": "\\b(compan|poly|polyfit|polyreduce|residue|conv|polyder|polyinteg|polyval|roots|deconv|polyderiv|polyout|polyvalm)\\b"
  },
  {
    "name": "support.function.quaternion.matlab",
    "match": "\\b(demoquat|qderiv|qmult|qtransvmat|qconj|qderivmat|qtrans|quaternion|qcoordinate_plot|qinv|qtransv)\\b"
  },
  {
    "name": "support.function.set.matlab",
    "match": "\\b(complement|create_set|intersection|union)\\b"
  },
  {
    "name": "support.function.signal.matlab",
    "match": "\\b(arch_fit|detrend|hamming|spectral_adf|arch_rnd|diffpara|hanning|spectral_xdf|arch_test|durbinlevinson|hurst|spencer|arma_rnd|fftconv|periodogram|stft|autocor|fftfilt|rectangle_lw|synthesis|autocov|fftshift|rectangle_sw|triangle_lw|autoreg_matrix|fractdiff|sinc|triangle_sw|bartlett|freqz|sinetone|unwrap|blackman|freqz_plot|sinewave|yulewalker)\\b"
  },
  {
    "name": "support.function.specfun.matlab",
    "match": "\\b(bessel|beta|betai|erfinv|gammai|log2|pow2)\\b"
  },
  {
    "name": "support.function.special-matrix.matlab",
    "match": "\\b(hankel|invhilb|toeplitz|hilb|sylvester_matrix|vander)\\b"
  },
  {
    "name": "support.function.statistics.base.matlab",
    "match": "\\b(center|iqr|median|ranks|table|cloglog|kendall|moment|run_count|values|cor|kurtosis|ols|skewness|var|corrcoef|logit|ppplot|spearman|cov|mahalanobis|probit|statistics|cut|mean|qqplot|std|gls|meansq|range|studentize)\\b"
  },
  {
    "name": "support.function.statistics.distributions.matlab",
    "match": "\\b(beta_cdf|f_inv|normal_inv|beta_inv|f_pdf|normal_pdf|beta_pdf|f_rnd|normal_rnd|beta_rnd|gamma_cdf|pascal_cdf|binomial_cdf|gamma_inv|pascal_inv|binomial_inv|gamma_pdf|pascal_pdf|binomial_pdf|gamma_rnd|pascal_rnd|binomial_rnd|geometric_cdf|poisson_cdf|cauchy_cdf|geometric_inv|poisson_inv|cauchy_inv|geometric_pdf|poisson_pdf|cauchy_pdf|geometric_rnd|poisson_rnd|cauchy_rnd|hypergeometric_cdf|stdnormal_cdf|chisquare_cdf|hypergeometric_inv|stdnormal_inv|chisquare_inv|hypergeometric_pdf|stdnormal_pdf|chisquare_pdf|hypergeometric_rnd|stdnormal_rnd|chisquare_rnd|kolmogorov_smirnov_cdf|t_cdf|discrete_cdf|laplace_cdf|t_inv|discrete_inv|laplace_inv|t_pdf|discrete_pdf|laplace_pdf|t_rnd|discrete_rnd|laplace_rnd|uniform_cdf|empirical_cdf|logistic_cdf|uniform_inv|empirical_inv|logistic_inv|uniform_pdf|empirical_pdf|logistic_pdf|uniform_rnd|empirical_rnd|logistic_rnd|weibull_cdf|exponential_cdf|lognormal_cdf|weibull_inv|exponential_inv|lognormal_inv|weibull_pdf|exponential_pdf|lognormal_pdf|weibull_rnd|exponential_rnd|lognormal_rnd|wiener_rnd|f_cdf|normal_cdf)\\b"
  },
  {
    "name": "support.function.statistics.models.matlab",
    "match": "\\b(logistic_regression|logistic_regression_likelihood|logistic_regression_derivatives)\\b"
  },
  {
    "name": "support.function.statistics.tests.matlab",
    "match": "\\b(anova|prop_test_2|bartlett_test|run_test|chisquare_test_homogeneity|sign_test|chisquare_test_independence|t_test|cor_test|t_test_2|f_test_regression|t_test_regression|hotelling_test|u_test|hotelling_test_2|var_test|kolmogorov_smirnov_test|welch_test|kolmogorov_smirnov_test_2|wilcoxon_test|kruskal_wallis_test|z_test|manova|z_test_2|mcnemar_test)\\b"
  },
  {
    "name": "support.function.strings.matlab",
    "match": "\\b(base2dec|deblank|findstr|lower|str2num|strrep|bin2dec|dec2base|hex2dec|rindex|strcat|substr|blanks|dec2bin|index|split|strcmp|upper|com2str|dec2hex|isletter|str2mat|strjust)\\b"
  },
  {
    "name": "support.function.time.matlab",
    "match": "\\b(asctime|clock|ctime|date)\\b"
  }
];

exports.MATLABSyntax = new TextmateSyntax(repositories, patterns);
