"use strict";
function setHintColor(args) {
    var dictionary = new NSDictionary([args.color.ios], [NSForegroundColorAttributeName]);
    args.view.ios.attributedPlaceholder = NSAttributedString.alloc().initWithStringAttributes(args.view.hint, dictionary);
}
exports.setHintColor = setHintColor;
//# sourceMappingURL=hint.util.js.map